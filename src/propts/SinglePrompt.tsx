import { ChangeEvent, KeyboardEvent } from "react";
import { Textarea } from "@mantine/core";
import { useState } from "react"

export function SimplePrompt({ handlePost }: { handlePost: (prompt: string | null) => void }) {
    const [prompt, setPrompt] = useState('')

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(event.target.value)
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handlePost(prompt)
            setPrompt("")
        }
    };

    return <Textarea
        value={prompt}
        placeholder="...ask me anything..."
        onKeyDown={handleKeyPress}
        onChange={handleChange}
    />
}