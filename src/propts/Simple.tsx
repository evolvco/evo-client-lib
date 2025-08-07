import {
    MDXEditor,
    MDXEditorMethods,
} from "@mdxeditor/editor";
import {
    useEffect,
    useRef,
    KeyboardEvent,
    useState
} from "react";
import {
    UnstyledButton,
    Loader,
    Flex,
    Text
} from "@mantine/core";
import { IconListNumbers, IconMarkdown, IconPrompt } from '@tabler/icons-react';
import { model } from "@lib/models/ModelFactory";
import '@mdxeditor/editor/style.css'
import './mdxeditor.css'
import {SimplePrompt} from "./SinglePrompt";
import { editorPlugins } from "./editorPlugins";
import { promptPlugins } from "./promptPlugins";
import { askEngine } from "./engine";

export function Simple({ topic }: { topic: Record<string, any> }) {
    const [simple, setSimple] = useState(true)
    const [messages, setMessages] = useState<any[] | undefined>()
    const [outputSteps, setOutputSteps] = useState(false)
    const [recap, setRecap] = useState(false)
    const editorRef = useRef<MDXEditorMethods>(null)
    const promptRef = useRef<MDXEditorMethods>(null)
    const CTX = model("ctx_message")
        
    useEffect(() => {
        if(!topic.id) return
        CTX.find({ where: { topic: topic.id } }).then((recs) => {
            setMessages(recs.map(({ role, content }) => ({ role, content, init: true })))
        }).catch(console.error)
    }, [topic.id])

    useEffect(() => {
        if(!messages) return
        if(recap){
            let md = messages.filter((m) => m.init).map((m) => m.content).join('\n')
            let all = editorRef.current?.getMarkdown()
            editorRef.current?.setMarkdown(md + '\n:::info\nEnd of Recap\n:::\n' + all)
        }else{
            let all = editorRef.current?.getMarkdown()
            let pieces = all?.split(':::info\nEnd of Recap\n:::')

            if(pieces && pieces.length > 1){
                editorRef.current?.setMarkdown(pieces[1])
            }
            else if(pieces && pieces.length === 1){
                editorRef.current?.setMarkdown('')
            }
            else{
                editorRef.current?.setMarkdown(all || '')
            }
        }
    }, [recap, topic.id])

    if (!topic.id) {
        return false
    }
    if (!messages) {
        return <Loader />
    }

    const handlePost = async (prompt: string | null) => {
        let sofar = editorRef.current?.getMarkdown()
        let post = prompt || promptRef.current?.getMarkdown()

        if (prompt) {
            post = ':::post\n' + prompt + '\n:::'
            editorRef.current?.setMarkdown(sofar + '\n' + post)
        }
        if(promptRef.current?.getMarkdown()){
            console.log(promptRef.current, promptRef.current?.getMarkdown())
        }
        try {
            let myMess = {
                role: "user",
                content: post || ''
            }

            await CTX.create({ ...myMess, topic: topic.id, createdAt: Date.now() })
            let nm = [...messages, myMess]
            promptRef.current?.setMarkdown('')
            setMessages(nm)

            let {answer} = await askEngine({
                messages:nm, 
                options:{
                    steps:outputSteps
                }
            })

            let aiMess = {
                role: "assistant",
                content: answer || ''
            }
            await CTX.create({ ...aiMess, topic: topic.id, createdAt: Date.now() })
            setMessages([...messages, aiMess])

            let all = editorRef.current?.getMarkdown()
            editorRef.current?.setMarkdown(all + '\n' + answer || '')
        } catch (e: any) {
            editorRef.current?.setMarkdown(sofar + '\n' + `:::danger\n${e.message}\n:::`)
            console.error(e)
        }
    }

    const handleCreateModel = () => {
        promptRef.current?.setMarkdown(
            `\n:::model\n## ns_\n### Fields\n* name *string*\n* description *string*\n ### Index\n* name \n### Required\n* name\n:::\n`
        )
    }
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            handlePost(null)
        }
    };

    const handleStepsToggle = () => {
        let steps = !outputSteps
        setOutputSteps(steps)
        if(!steps){
            handlePost(`Do not use structured output for now`)
        }else{
            editorRef.current?.setMarkdown(
                editorRef.current?.getMarkdown() + `\n:::info\nShowing Process Steps\n:::\n`
            )
        }
    }

    return (<>
        <Text size="lg" ta="center">{topic.name}</Text>
        <MDXEditor
            ref={editorRef}
            markdown=""
            plugins={editorPlugins({messages, recap, setRecap})}
        />
        {!simple && <>
            <MDXEditor
                autoFocus={true}
                placeholder="...ask me anything..."
                ref={promptRef}
                markdown=""
                plugins={promptPlugins({handlePost, handleCreateModel})}
            />
            <Flex justify="space-between">
                <UnstyledButton onClick={() => setSimple(true)}>
                    <IconPrompt />
                </UnstyledButton>
            </Flex>
        </>}
        {simple && <>
            <SimplePrompt
                handlePost={handlePost}
            />
            <Flex direction={"row"}>
                <UnstyledButton onClick={() => setSimple(false)}>
                    <IconMarkdown />
                </UnstyledButton>
            </Flex>
        </>}
        <Flex direction={"row"}>
            <UnstyledButton onClick={handleStepsToggle}>
                <IconListNumbers />
            </UnstyledButton>
        </Flex>
    </>)
}


