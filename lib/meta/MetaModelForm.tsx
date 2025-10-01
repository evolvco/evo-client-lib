import { useState, useEffect } from 'react'
import {
  Confirm,
  Icon,
  Alert,
  Tabset,
  Button,
  ButtonGroup,
  CodeEditor,
  Loader,
  FieldsEditor
} from "@lib/ui"
import { create, update, remove } from '@lib/models'
import { useMeta } from './MetaProvider'
import {HooksEditor} from './HooksEditor'
import {usePrefs} from '@lib/components/hooks'
import { dispatch } from '@lib/bus'
import Ajv, { ErrorObject } from 'ajv'
import pluralize from 'pluralize'
import {ModelInfoFields} from './ModelInfoFields'
import {ActionsEditor} from './ActionsEditor'
import { toUnderscoreCase } from '@lib/utils'
import { Save as SaveIcon } from 'lucide-react'
import { Meta, Actions, Hooks } from '@lib/types'

function fillObject(record: any) {
  if(!record.sync){
    record.sync = 'server-only'
  }
  Object.keys(record.schema).forEach((k) => {
    if (record.schema[k].constructor === Array) {
      if (!record.schema[k][0]._ui_) record.schema[k][0]._ui_ = {}
    } else {
      if (!record.schema[k]._ui_) record.schema[k]._ui_ = {}
    }
  })
  if (!record.hooks) record.hooks = defualtHooks()
  if (!record.actions) record.actions = defaultActions()
  //Todo hate having to do this. should meta spec define all atts of just ones that are not default?
  Object.keys(record.actions).forEach((crudAction) => {
    if(!record.actions[crudAction].notify) record.actions[crudAction].notify = {
      email: false,
      email_addresses: []
    }
  })
  return record
}

const defualtHooks = () => {
  return {
    'pre_save': '',
    'post_save': '',
    'pre_remove': '',
    'post_remove': '',
    'read_vo': ''
  }
}

const defaultActions = ()=>{
  return {
    create: {
      order: [],
      tags_order: [],
      tags_display: 'tabs',
      populate: [],
      notify: {
        email: false,
        email_addresses: []
      },
      service: {
        path: `/api/:collection`,
        method: 'POST',
        secure: true
      }
    },
    collection: {
      order: [],
      tags_order: [],
      tags_display: 'tabs',
      populate: [],
      notify: {
        email: false,
        email_addresses: []
      },
      sort: [],
      service: {
        path: `/api/:collection`,
        method: 'GET',
        secure: true
      }
    },
    detail: {
      order: [],
      tags_order: [],
      tags_display: 'tabs',
      populate: [],
      notify: {
        email: false,
        email_addresses: []
      },
      service: {
        path: `/api/:collection/:id`,
        method: 'GET',
        secure: true
      }
    },
    update: {
      order: [],
      tags_order: [],
      tags_display: 'tabs',
      populate: [],
      notify: {
        email: false,
        email_addresses: []
      },
      service: {
        path: `/api/:collection/:id`,
        method: 'PUT',
        secure: true
      }
    },
    remove: {
      notify: {
        email: false,
        email_addresses: []
      },
      service: {
        path: `/api/:collection/:id`,
        method: 'DELETE',
        secure: true
      }
    }
  }
}

const ajv = new Ajv()
const validJSON = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "plural": {
      "type": "string",
      "minLength": 1
    },
    "database": {
      "type": "string",
      "minLength": 1
    },
    "sync": {
      "type": "string",
      "minLength": 1
    },
    "recordName": {
      "type": "string"
    },
    "primaryKey": {
      "type": "string"
    },
    "socket_support": {
      "type":"boolean"
    },
    "order": {
      "type": "array"
    },
    "tags": {
      "type": "array"
    },
    "mixins": {
      "type": "array"
    },
    "description": {
      "type": "string",
      "default":""
    },
    "collection": {
      "type": "string",
      "default":""
    },  
    "ownRecordsKey": {
      "type": "string",
      "default":""
    },
    "view_own_records": {
      "type": "boolean",
      "default":false
    },
    "read_own_records": {
      "type": "boolean",
      "default":false
    },
    "create_own_records": {
      "type": "boolean",
      "default":false
    },
    "update_own_records": {
      "type": "boolean",
      "default":false
    },
    "delete_own_records": {
      "type": "boolean",
      "default":false
    },
    "schema": {
      "minProperties": 1,
      "type": "object"
    },
    "hooks": {
      "type": "object",
      "properties": {
        "pre_save": {
          "type": "string"
        },
        "post_save": {
          "type": "string"
        },
        "pre_remove": {
          "type": "string"
        },
        "post_remove": {
          "type": "string"
        },
        "read_vo": {
          "type": "string"
        }
      }
    },
    "actions": {
      "type": "object",
      "properties": {
        "create": {
          "type": "object",
          "properties": {
            "order": {
              "type": "array"
            },
            "populate": {
              "type": "array"
            },
            "service": {
              "type": "object",
              "properties": {
                "path": {
                  "type": "string"
                },
                "method": {
                  "type": "string"
                },
                "secure": {
                  "type": "boolean"
                }
              }
            }
          }
        },
        "collection": {
          "type": "object",
          "properties": {
            "order": {
              "type": "array"
            },
            "populate": {
              "type": "array"
            },
            "service": {
              "type": "object",
              "properties": {
                "path": {
                  "type": "string"
                },
                "method": {
                  "type": "string"
                },
                "secure": {
                  "type": "boolean"
                }
              }
            }
          }
        },
        "detail": {
          "type": "object",
          "properties": {
            "order": {
              "type": "array"
            },
            "populate": {
              "type": "array"
            },
            "service": {
              "type": "object",
              "properties": {
                "path": {
                  "type": "string"
                },
                "method": {
                  "type": "string"
                },
                "secure": {
                  "type": "boolean"
                }
              }
            }
          }
        },
        "update": {
          "type": "object",
          "properties": {
            "order": {
              "type": "array"
            },
            "populate": {
              "type": "array"
            },
            "service": {
              "type": "object",
              "properties": {
                "path": {
                  "type": "string"
                },
                "method": {
                  "type": "string"
                },
                "secure": {
                  "type": "boolean"
                }
              }
            }
          }
        },
        "remove": {
          "type": "object",
          "properties": {
            "service": {
              "type": "object",
              "properties": {
                "path": {
                  "type": "string"
                },
                "method": {
                  "type": "string"
                },
                "secure": {
                  "type": "boolean"
                }
              }
            }
          }
        }
      }
    }
  },
  required: ["name", "database", "plural", "schema", "actions"]
}
const validate = ajv.compile(validJSON)

const blank = (): Meta => {
  return {
    name: '',
    plural: '',
    recordName: '',
    primaryKey: '',
    ownRecordsKey: '',
    collection: '',
    description: '',
    database:'document',
    sync:'server-only',
    socket_support:false,
    order: [],
    tags: [],
    mixins: [],
    schema: {},
    view_own_records: false,
    read_own_records: false,
    create_own_records: false,
    update_own_records: false,
    delete_own_records: false,
    actions: defaultActions() as any,
    hooks: defualtHooks()
  }
}

interface MetaModelFormProps {
  hide?: (nm?:string) => void
  className?: string,
  model: string
}

export default function CrudForm({model, hide=()=>{}, className }: MetaModelFormProps) {
  let [values, setValues] = useState<Meta>({} as Meta)
  let [error, setError] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)
  const {prefs} = usePrefs()
  const {metaModels, loadingMetaModels, loadMetaModels} = useMeta()
  let record = metaModels.find((m) => m.name === model)

  useEffect(() => {
    setValues(record ? fillObject(record) : blank())
  }, [record])

  const onSubmit = async () => {
    if(!values) return
    try {
      const valid = validate(values)
      if (!valid) {
        //console.log(validate.errors)
        setError(validate.errors?.map((e:ErrorObject)=>e.message).join('\n'))
      } else {
        setSubmitting(true)
        let params = {
          name: values.name,
          plural: values.plural,
          recordName: values.recordName,
          primaryKey: values.primaryKey,
          ownRecordsKey: values.ownRecordsKey,
          description: values.description,
          sync: values.sync,
          database: values.database,
          order: values.order,
          tags: values.tags,
          mixins: values.mixins,
          collection: values.collection,
          socket_support: values.socket_support,
          view_own_records: values.view_own_records,
          read_own_records: values.read_own_records,
          create_own_records: values.create_own_records,
          update_own_records: values.update_own_records,
          delete_own_records: values.delete_own_records,
          schema: JSON.stringify(values.schema),
          hooks: JSON.stringify(values.hooks),
          actions: JSON.stringify(values.actions)
        }
        if (model && record) {
          console.log("---schema", values.schema)
          setSubmitting(true)
          const res = await update('meta', record.id as string, params)
          setSubmitting(false)
          if (res) {
            dispatch('notify', { type: 'success', message: `${record.name} updated` })
            loadMetaModels()
          } else {
            throw new Error('Error no object returned')
          }
        } else {
          setSubmitting(true)
          params.name = values.name
          const res = await create('meta', params)
          setSubmitting(false)
          if (res) {
            dispatch('notify', { type: 'success', message: `${values.name} created` })
            loadMetaModels()
            return res
          } else {
            throw new Error('Error no object returned')
          }
        }
      }
    } catch (e:any) {
      console.log(e)
      setError(e.message)
      setSubmitting(false)
      throw e
    }
  }

  const extendValues = (att: any) => {
    if (att.name) {
      att.plural = pluralize(att.name)
      att.collection = toUnderscoreCase(pluralize(att.name||''))
    }
    //console.log('---extendValues', { ...values, ...att })
    setValues({ ...values, ...att })
  }

  const deleteMeta = async () => {
    if(!record) return
    await remove('meta', record.id as string)
    dispatch('notify', { type: 'success', message: `${record.name} successfully deleted` })
    loadMetaModels()
    hide()
  }

  if (loadingMetaModels || Object.keys(values).length === 0) {
    return <Loader />
  }

  if (model && Object.keys(values.schema).length === 0) {
    return false
  }

  const valid = validate(values)
  console.log('---meta-crud-form', values)

  /*
  {prefs.metaEditor !== 'json' && <FieldsEditor
              value={values.schema}
              onChange={(value) => extendValues({ schema: value })}
            />}
  */


  return (
    <form onSubmit={onSubmit} className={`meta-crud-form ${className||''}`}>
      <Alert
        open={error ? true : false}
        variant={'danger'}
      ><Icon name="exclamation-octagon" />{error}</Alert>
      <div className="contents">
        <Tabset>
          <div data-label="Model Information">
            <ModelInfoFields 
              edit={!!model}
              values={values}
              extendValues={extendValues}
            />
          </div>
          <div data-label="Schema Fields">
            <div className="view">
              <ButtonGroup>
                <Button 
                    size="small" 
                    onClick={() => dispatch(`user-prefs-change`, { metaEditor: 'json' })} 
                    variant={prefs.metaEditor === 'json' ? 'primary' : 'default'}
                >JSON</Button>
                <Button 
                    size="small" 
                    onClick={() => dispatch(`user-prefs-change`, { metaEditor: 'tabs' })} 
                    variant={prefs.metaEditor === 'tabs' ? 'primary' : 'default'}
                >Form</Button>
              </ButtonGroup>
            </div>
            {prefs.metaEditor === 'json' && <CodeEditor
              height="100vh"
              onChange={(value) => extendValues({ schema: value })}
              value={values.schema}
            />}
            
          </div>
          <div data-label="Model Hooks">
            <HooksEditor
              value={values.hooks as any}
              onChange={(atts: any) => extendValues({ hooks: { ...values.hooks, ...atts } })}
            />
          </div>
          <div data-label="Crud Actions">
            <ActionsEditor
              value={values.actions as any}
              schema={values.schema}
              metaModels={metaModels}
              onChange={(atts: any) => extendValues({ actions: { ...values.actions, ...atts } })}
            />
          </div>
        </Tabset>
      </div>
      <div className='p-2' slot="footer" >
        <div className='flex gap-2'>   
          <Button
            disabled={!valid}
            variant="primary"
            onClick={async () => {
              try{
                await onSubmit()
                hide(values.name)
              }catch(e){
                console.log(e)
              }
            }}>
            {model ? "Update" : "Create"}
          </Button>
          
          {model && <Button
            disabled={!valid}
            variant="primary"
            onClick={async () => {
              try{
                await onSubmit()
              }catch(e){
                console.log(e)
              }
            }}
          ><SaveIcon size={18} strokeWidth={1.5} /></Button>}

          {!model && <Button
            disabled={!valid}
            variant="primary"
            onClick={async () => {
              await onSubmit()
              setValues(blank())
            }}>
            <Icon name="plus-lg" />
          </Button>}
          
          <Button variant="default" onClick={hide}>
            Cancel
          </Button>
          
          {model && <Confirm onConfirm={deleteMeta} ><Button variant="danger">
            Delete
          </Button></Confirm>}
        </div>
      </div>
    </form>
  )
}

