import { JsxComponentDescriptor, insertJsx$, JsxEditorProps, usePublisher, GenericJsxEditor } from "@mdxeditor/editor"
import { Button } from "@mantine/core"
import { ModelView } from "../models"

export const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    /*{ {
      name: 'MyLeaf',
      kind: 'text', // 'text' for inline, 'flow' for block
      // the source field is used to construct the import statement at the top of the markdown document.
      // it won't be actually sourced.
      source: './external',
      // Used to construct the property popover of the generic editor
      props: [
        { name: 'foo', type: 'string' },
        { name: 'bar', type: 'string' },
        { name: 'onClick', type: 'expression' }
      ],
      // whether the component has children or not
      hasChildren: true,
      Editor: GenericJsxEditor
    },
   
      name: 'Marker',
      kind: 'text',
      source: './external',
      props: [{ name: 'type', type: 'string' }],
      hasChildren: false,
      Editor: () => {
        return (
          <div style={{ border: '1px solid red', padding: 8, margin: 8, display: 'inline-block' }}>
            <NestedLexicalEditor<MdxJsxTextElement>
              getContent={(node) => node.children}
              getUpdatedMdastNode={(mdastNode, children: any) => {
                return { ...mdastNode, children }
              }}
            />
          </div>
        )
      }
    },*/
    {
      name: 'BlockNode',
      kind: 'flow',
      source: './external',
      props: [{name:'name', type:'string'}],
      hasChildren: false,
      Editor: (props: JsxEditorProps) => {
        const nm = props.mdastNode.attributes.find((p:any)=>p.name==='name')
        return <ModelView name={nm?.value as string} />
      }
    }
  ]
  
  // a toolbar button that will insert a JSX element into the editor.
/*  export const InsertMyLeaf = () => {
    const insertJsx = usePublisher(insertJsx$)
    return (
      <Button
        onClick={() =>
          insertJsx({
            name: 'MyLeaf',
            kind: 'text',
            props: { foo: 'bar', bar: 'baz', onClick: { type: 'expression', value: '() => console.log("Clicked")' } }
          })
        }
      >
        Leaf
      </Button>
    )
  }*/

  export const InsertBlock = () => {
    const insertJsx = usePublisher(insertJsx$)
    return (
      <Button
        onClick={() =>
          insertJsx({
            name: 'BlockNode',
            kind: 'flow',
            props: {
                name:'friend'
            }
          })
        }
      >
        Data Table
      </Button>
    )
  }