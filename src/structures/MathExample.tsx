import {openai} from "@/propts/engine";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { useState, useEffect } from "react";
import { SimplePrompt } from "@/propts/SinglePrompt";

export function MathExample() {
  const [math_reasoning, setMathReasoning] = useState<any>(null)

  const doMath = async (prompt: string | null) => {
    if (!prompt) return

    const Step = z.object({
      explanation: z.string(),
      output: z.string(),
    });
  
    const MathReasoning = z.object({
      steps: z.array(Step),
      final_answer: z.string(),
    });
  
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful math tutor. Guide the user through the solution step by step." },
        { role: "user", content: prompt },
      ],
      response_format: zodResponseFormat(MathReasoning, "math_reasoning"),
    });
  
    setMathReasoning(JSON.parse(completion.choices[0].message.content || '{}'))
  }

  return <>
    <div>
      <h1>Math Example</h1>
      <sub>how can I solve 8x + 7 = -23</sub>
      <SimplePrompt
        handlePost={doMath}
      />
      <h4>{math_reasoning?.final_answer}</h4>
      <h6>Steps</h6>
      <ol>
        {math_reasoning?.steps?.map((step: any) => (
          <li style={{fontSize: ".8rem"}} key={step.explanation}>{step.explanation}</li>
        ))}
      </ol>
    </div>
  </>
}