import { InsertCodeBlock, InsertSandpack } from "@mdxeditor/editor"
import { ConditionalContents } from "@mdxeditor/editor"
import {
    headingsPlugin,
    linkPlugin,
    imagePlugin,
    listsPlugin,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
    frontmatterPlugin,
    diffSourcePlugin,
    directivesPlugin,
    codeBlockPlugin,
    sandpackPlugin,
    codeMirrorPlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    DiffSourceToggleWrapper,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    Separator,
    ListsToggle,
    InsertTable,
    InsertFrontmatter,
    UndoRedo,
    ChangeCodeMirrorLanguage,
    ShowSandpackInfo
} from "@mdxeditor/editor";
import { 
    CalloutDirectiveDescriptor, 
    InfoDirectiveDescriptor,
    CreateModelDirectiveDescriptor 
} from "@/editor/MdxDirectives";
import { PlainTextCodeEditorDescriptor } from "@/editor/MdxEditors";
import { simpleSandpackConfig } from "@/editor/SandpackEditor";
import { Button } from "@mantine/core";

export const promptPlugins = ({handlePost, handleCreateModel}: {handlePost: (prompt: string | null) => void, handleCreateModel: () => void}) => {
    return [
        headingsPlugin(),
        linkPlugin(),
        imagePlugin(),
        listsPlugin(),
        quotePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        diffSourcePlugin({
            diffMarkdown: '',
            viewMode: 'rich-text'
        }),
        directivesPlugin({
            directiveDescriptors: [
                CalloutDirectiveDescriptor,
                InfoDirectiveDescriptor,
                CreateModelDirectiveDescriptor
            ]
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
                    <BoldItalicUnderlineToggles />
                    <BlockTypeSelect />
                    <Separator />
                    <ListsToggle />
                    <InsertTable />
                    <InsertFrontmatter />
                    <ConditionalContents
                        options={[
                            { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                            { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                            {
                                fallback: () => (<>
                                    <InsertCodeBlock />
                                    <InsertSandpack />
                                </>)
                            }
                        ]}
                    />
                    <Button onClick={handleCreateModel}>New Model</Button>
                    <Button onClick={() => handlePost(null)}>Post</Button>
                    <DiffSourceToggleWrapper>
                        <UndoRedo />
                    </DiffSourceToggleWrapper>
                </>
            )
        })
    ]
}