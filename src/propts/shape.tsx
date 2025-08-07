import { z } from "zod";

export const OutputStep = z.object({
    explanation: z.string(),
    output: z.string(),
});

export const OutputProcess = z.object({
    steps: z.array(OutputStep),
    final_answer: z.string(),
});

export const OutputPlain = z.object({
    answer: z.string(),
});