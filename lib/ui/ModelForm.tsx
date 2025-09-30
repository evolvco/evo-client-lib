import React, { createContext, useEffect, useState } from 'react';
import { useMeta } from '../meta';
import { on as _on, dispatch } from '../bus';
import { isInValid, toFields } from '../models/utils';
import { builder, create, findOne, findById, remove, update } from '../models/services';
import { BuilderParams, ModelFormProps, ModelRecord } from '@lib/types';
import { Alert, Loader } from '@lib/ui';
import { toast } from '@lib/ui';

export interface FormContextType {
  record?: any;
  meta?: any;
  values?: any;
  fails?: any;
  fields?: any;
  metaModels?: any;
  setValues?: React.Dispatch<React.SetStateAction<any>>;
  handleRemove?: () => Promise<void>;
  handleUpdate?: () => Promise<void>;
  handleCreate?: () => Promise<void>;
}

export const FormContext = createContext<FormContextType>({});

export function ModelForm({
  className,
  children,
  style,
  meta,
  action,
  onSelect,
  id,
  dispatchUpdate,
  dispatchRemove,
  dispatchCreate,
}: ModelFormProps): JSX.Element | null {
  const [record, setRecord] = useState<any>();
  const [values, setValues] = useState<any>();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { metaModels } = useMeta();
  
  const fields = toFields({ meta });
  
  useEffect(() => {
    const vals = record && record.id ? record : setAnyDefaults();
    setValues(vals);
  }, [record]);

  function setAnyDefaults(): Record<string, any> {
    let values: Record<string, any> = {};
    fields.forEach((fld: any) => {
      if (fld.default) {
        values[fld.name] = fld.default;
      }
    });
    return values;
  }

  async function handleCreate(): Promise<void> {
    try {
      let params = { ...values };
      let res;
      if (meta.actions && meta.actions.create) {
        res = await builder({
          collection: meta.name,
          method: meta.actions.create.service.method,
          path: meta.actions.create.service.path,
          body: params,
          secure: true,
        } as BuilderParams);
      } else {
        res = await create(meta.name, params);
      }
      if (res) {
        dispatch('notify', {
          type: 'success',
          message: `${res[meta.recordName]} created`,
        });
        dispatch(dispatchCreate!, res);
        toast?.success(`${res[meta.recordName]} created`);
        setSuccess(`${res[meta.recordName]} created`);
        setError(undefined);
        return;
      } else {
        throw new Error('Error no object returned');
      }
    } catch (e: any) {
      console.log(e);
      setError(e.message);
      throw e;
    }
  }

  async function handleUpdate(): Promise<void> {
    try {
      let params = { ...values };
      let res;
      if (meta.actions && meta.actions.update) {
        res = await builder({
          collection: meta.name,
          id: record.id,
          method: meta.actions.update.service.method,
          path: meta.actions.update.service.path,
          body: params,
          secure: true,
        } as BuilderParams);
      } else {
        res = await update(meta.name, record.id, params);
      }
      if (res) {
        dispatch('notify', {
          type: 'success',
          message: `${record[meta.recordName]} updated`,
        });
        dispatch(dispatchUpdate!, res);
        toast?.success(`${res[meta.recordName]} updated`);
        setSuccess(`${res[meta.recordName]} updated`);
        setError(undefined);
        return;
      } else {
        throw new Error('Error no object returned');
      }
    } catch (e: any) {
      console.log(e);
      setError(e.message);
      throw e;
    }
  }

  const handleRemove = async (): Promise<void> => {
    await remove(meta.name, record.id);
    dispatch('notify', {
      type: 'success',
      message: `${record[meta.recordName]} successfully deleted`,
    });
    dispatch(dispatchRemove!, record[meta.recordName]);
    toast?.success(`${record[meta.recordName]} successfully deleted`);
    setSuccess(`${record[meta.recordName]} successfully deleted`);
    setError(undefined);
  }

  useEffect(() => {
    return _on(onSelect!, async (value: any) => {
      if (!value) {
        setRecord({});
        return;
      }
      setLoading(true);
      const record = typeof(value) === 'string' ? await findOne(meta.name, { where: { [meta.recordName]: value } }) : value;
      //console.log('record', record);
      setRecord(record);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (id) {
        setLoading(true);
        findById(meta.name, id).then((record: ModelRecord) => {
          setRecord(record);
          setLoading(false);
        }).catch((error: any) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (action === 'create') {
      setRecord({});
    }
  }, [action]);

  if (loading) return <Loader />;
  if (!record || !metaModels) return null;

  const fails = isInValid({ values, fields });

  return (
    <form className={className} style={style}>
      <FormContext.Provider
        value={{
          record,
          fields,
          meta,
          metaModels,
          values,
          fails,
          setValues,
          handleRemove,
          handleUpdate,
          handleCreate,
        }}
      >
        {error && (
          <Alert className="mb-2" open={error ? true : false} variant={'danger'} closeHandler={() => setError(undefined)}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert className="mb-2" open={success ? true : false} variant={'success'} closeHandler={() => setSuccess(undefined)}>
            {success}
          </Alert>
        )}

        {children}
      </FormContext.Provider>
    </form>
  );
}
