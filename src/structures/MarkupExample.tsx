import { openai } from "@/propts/engine";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { useState } from "react";
import { SimplePrompt } from "@/propts/SinglePrompt";

export function MarkupExample() {
    const [markup, setMarkup] = useState<any>(null)

    const makeMarkup = async (prompt: string | null) => {
        if (!prompt) return

        const UI: z.ZodType = z.lazy(() =>
            z.object({
                type: z.enum(["div", "button", "header", "section", "field", "form"]),
                label: z.string(),
                children: z.array(UI),
                attributes: z.array(
                    z.object({
                        name: z.string(),
                        value: z.string(),
                    })
                ),
            })
        );

        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
                {
                    role: "system",
                    content: "You are a UI generator AI. Convert the user input into a UI.",
                },
                { role: "user", content: prompt },
            ],
            response_format: zodResponseFormat(UI, "ui"),
        });

        const ui = completion.choices[0].message.parsed;

        setMarkup(ui)
    }

    return <>
        <div>
            <h1>Render Markup</h1>
            <SimplePrompt
                handlePost={makeMarkup}
            />
            <code>{JSON.stringify(markup, null, 2)}</code>
        </div>
    </>
}