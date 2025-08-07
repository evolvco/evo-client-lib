import {
    UndoRedo,
    InsertTable,
    InsertCodeBlock,
    InsertImage,
    DiffSourceToggleWrapper,
    InsertFrontmatter,
    BoldItalicUnderlineToggles,
    ListsToggle,
    Separator,
    BlockTypeSelect,
    ChangeCodeMirrorLanguage,
    ShowSandpackInfo,
    InsertSandpack,
    ButtonOrDropdownButton,
    ConditionalContents
} from '@mdxeditor/editor'

import { InsertBlock } from './MdxComponents'

export function MdxToolbar() {

    return <>
        <BoldItalicUnderlineToggles />
        <BlockTypeSelect />
        <Separator />
        <ListsToggle />
        <InsertImage />
        <InsertTable />
        <InsertBlock />
        <InsertFrontmatter />
        <ConditionalContents
            options={[
                { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                { fallback: () => (<>
                        <InsertCodeBlock />
                        <InsertSandpack />
                    </>)
                }
            ]}
        />
        <Separator />
        <ButtonOrDropdownButton 
            title="Notify"
            onChoose={()=>{
                //console.log(444444,ref)
            }}
            items={[
                {label:'Info', value:'info'},
                {label:'Success', value:'success'},
                {label:'Warning', value:'warning'},
                {label:'Danger', value:'danger'}
            ]}>Notify</ButtonOrDropdownButton>
        <DiffSourceToggleWrapper>
            <UndoRedo />
        </DiffSourceToggleWrapper>

    </>
}