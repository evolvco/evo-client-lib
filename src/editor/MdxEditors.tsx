import {CodeBlockEditorDescriptor, useCodeBlockEditorContext} from '@mdxeditor/editor'

export const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
    // always use the editor, no matter the language or the meta of the code block
    match: (language, meta) => true,
    // You can have multiple editors with different priorities, so that there's a "catch-all" editor (with the lowest priority)
    priority: 0,
    // The Editor is a React component
    Editor: (props) => {
      const cb = useCodeBlockEditorContext()
      // stops the propagation so that the parent lexical editor does not handle certain events.
      return (
        <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
          <textarea rows={3} cols={20} defaultValue={props.code} onChange={(e) => cb.setCode(e.target.value)} />
        </div>
      )
    }
  }
