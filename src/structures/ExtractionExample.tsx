import { openai } from "@/propts/engine";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { useState } from "react";
import { SimplePrompt } from "@/propts/SinglePrompt";

export function ExtractionExample() {
    const [extraction, setExtraction] = useState<any>(null)

    const doExtraction = async (prompt: string | null) => {
        if (!prompt) return

        const ResearchPaperExtraction = z.object({
            title: z.string(),
            authors: z.array(z.string()),
            abstract: z.string(),
            keywords: z.array(z.string()),
        });

        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: "You are an expert at structured data extraction. You will be given unstructured text from a research paper and should convert it into the given structure." },
                { role: "user", content: prompt },
            ],
            response_format: zodResponseFormat(ResearchPaperExtraction, "research_paper_extraction"),
        });

        const research_paper = completion.choices[0].message.parsed;
        setExtraction(research_paper)
    }

    return <>
        <div>
            <h1>Extraction Example</h1>
            <sub>grab the structured data from the following text</sub>
            <SimplePrompt
                handlePost={doExtraction}
            />
            <h4>{extraction?.title}</h4>
            <h6>Authors</h6>
            <ol>
                {extraction?.authors.map((author: any) => (
                    <li style={{ fontSize: ".8rem" }} key={author}>{author}</li>
                ))}
            </ol>
            <h6>Abstract</h6>
            <p>{extraction?.abstract}</p>
            <h6>Keywords</h6>
            <ol>
                {extraction?.keywords.map((keyword: any) => (
                    <li style={{ fontSize: ".8rem" }} key={keyword}>{keyword}</li>
                ))}
            </ol>
        </div>
    </>
}