import {
    headingsPlugin,
    linkPlugin,
    imagePlugin,
    listsPlugin,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
    frontmatterPlugin,
    directivesPlugin,
    diffSourcePlugin,
    codeBlockPlugin,
    sandpackPlugin,
    codeMirrorPlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    DiffSourceToggleWrapper,
} from "@mdxeditor/editor";
import { Recap } from "./Recap";
import { 
    CalloutDirectiveDescriptor, 
    InfoDirectiveDescriptor,
    CreateModelDirectiveDescriptor, 
    PostBubbleDirectiveDescriptor 
} from "@/editor/MdxDirectives";
import { PlainTextCodeEditorDescriptor } from "@/editor/MdxEditors";
import { simpleSandpackConfig } from "@/editor/SandpackEditor";



export const editorPlugins = ({messages, recap, setRecap}: {messages: any[], recap: boolean, setRecap: (recap: boolean) => void})=> {
    return [
        headingsPlugin(),
        linkPlugin(),
        imagePlugin(),
        listsPlugin(),
        quotePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        directivesPlugin({
            directiveDescriptors: [
                CalloutDirectiveDescriptor,
                InfoDirectiveDescriptor,
                CreateModelDirectiveDescriptor,
                PostBubbleDirectiveDescriptor
            ]
        }),
        diffSourcePlugin({
            diffMarkdown: 'An older version',
            viewMode: 'rich-text'
        }),
        codeBlockPlugin({
            defaultCodeBlockLanguage: 'json',
            codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor]
        }),
        sandpackPlugin({
            sandpackConfig: simpleSandpackConfig
        }),
        codeMirrorPlugin({
            codeBlockLanguages: { js: 'JavaScript', ts: 'TypeScript', css: 'CSS', json: 'JSON' }
        }),
        markdownShortcutPlugin(),
        toolbarPlugin({
            toolbarContents: () => (
                <>
                <DiffSourceToggleWrapper>
                    <Recap count={messages.length} recap={recap} setRecap={setRecap} />
                </DiffSourceToggleWrapper>
                </>
            )
        })
    ]
}