import { 
    callFunction, 
    getModelsSpec, 
    getMetaModelSpec,
    createMetaModelSpec
} from "@/tools"
import OpenAI from "openai";
import { OutputProcess, OutputPlain } from "./shape";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat/completions.mjs";
import { jsonToMarkdown } from "./jsonToMarkdown";

export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function askEngine({ messages, options }: { messages: any[], options: any }) {

    let ctx:ChatCompletionCreateParamsNonStreaming = {
        model: "gpt-4o-mini",
        messages,
        tools: [
            getMetaModelSpec,
            getModelsSpec,
            //createMetaModelSpec
        ]
    }
    if(options.steps){
        ctx.response_format = zodResponseFormat(OutputProcess, "output_process")
    }

    let completion = await openai.chat.completions.create(ctx)

    let answer: string | undefined
    let toolCalls = completion.choices[0].message.tool_calls

    if (toolCalls) {
        let newMessages: any[] = []
        let fns = toolCalls.map(async (toolCall) => {
            const name = toolCall.function.name;
            const args = JSON.parse(toolCall.function.arguments);

            let result = await callFunction(name, args)
            newMessages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: result.toString()
            })
            return
        })
        await Promise.all(fns)
        //resend the completion
        answer = newMessages.map((m) => m.content).join('\n')
    } else {
        if(options.steps){
            answer = JSON.parse(completion.choices[0].message.content || '{}')
            answer = jsonToMarkdown(answer)
        }else{
            answer = completion.choices[0].message.content || ''
        }
    }
    return { answer, completion }
}