import React from 'react'
import { DirectiveDescriptor, GenericDirectiveEditor, NestedLexicalEditor, useNestedEditorContext } from '@mdxeditor/editor'
import { Notify } from '@/ui/Notify'
import { Badge } from '@mantine/core'

const ADMONITION_TYPES = ["info", "success", "warning", "danger"];

export const CalloutDirectiveDescriptor: DirectiveDescriptor = {
    name: 'callout',
    testNode(node) {
        return node.name === 'callout'
    },
    // set some attribute names to have the editor display a property editor popup.
    attributes: ['name'],
    // used by the generic editor to determine whether or not to render a nested editor.
    hasChildren: true,
    Editor: GenericDirectiveEditor
}

export const InfoDirectiveDescriptor: DirectiveDescriptor = {
    name: 'notify',
    testNode(node) {
        return ADMONITION_TYPES.includes(node.name)
    },
    // set some attribute names to have the editor display a property editor popup.
    attributes: ['name'],
    // used by the generic editor to determine whether or not to render a nested editor.
    hasChildren: true,
    Editor({ mdastNode }) {
        const {
            config: { theme }
        } = useNestedEditorContext();
        return React.createElement(Notify, {
            title: '',
            type: mdastNode.name as 'info' | 'success' | 'warning' | 'danger', 
            open: true,
            children:null
        }, React.createElement(
            NestedLexicalEditor,
            {
                block: true,
                getContent: (node) => 'children' in node ? node.children : [],
                getUpdatedMdastNode: (mdastNode2, children) => ({ 
                    ...mdastNode2, 
                    children: children as any[] 
                })
            }
        ));
    }
}


const SpeechBubble = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`speech-bubble user`}>
      {children}
    </div>
  );
};

export default SpeechBubble;

/*
:::model
# ex_task
* name
* description
* status
  * logged
  * inprocess
  * blocked
  * closed
* active *boolean*
## index
* name
* active
* status
## required
* name
:::
*/
export const CreateModelDirectiveDescriptor: DirectiveDescriptor = {
    name: 'model',
    testNode(node) {
        return  node.name === 'model'
    },
    // set some attribute names to have the editor display a property editor popup.
    attributes: [],
    // used by the generic editor to determine whether or not to render a nested editor.
    hasChildren: true,
    Editor({ mdastNode }) {
        const {
            config: { theme }
        } = useNestedEditorContext();
        return <>{React.createElement(
            NestedLexicalEditor,
            {
                block: true,
                getContent: (node) => 'children' in node ? node.children : [],
                getUpdatedMdastNode: (mdastNode2, children) => ({ 
                    ...mdastNode2, 
                    children: children as any[] 
                })
            }
        )}</>
    }
}

export const PostBubbleDirectiveDescriptor: DirectiveDescriptor = {
    name: 'post',
    testNode(node) {
        return  node.name === 'post'
    },
    // set some attribute names to have the editor display a property editor popup.
    attributes: [],
    // used by the generic editor to determine whether or not to render a nested editor.
    hasChildren: true,
    Editor({ mdastNode }) {
        const {
            config: { theme }
        } = useNestedEditorContext();
        return <SpeechBubble>{React.createElement(
            NestedLexicalEditor,
            {
                block: true,
                getContent: (node) => 'children' in node ? node.children : [],
                getUpdatedMdastNode: (mdastNode2, children) => ({ 
                    ...mdastNode2, 
                    children: children as any[] 
                })
            }
        )}</SpeechBubble>
    }
}

