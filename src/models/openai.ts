
async function login() {

    const tokenResponse = await fetch(`/v1/realtime/sessions`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o-realtime-preview-2024-12-17",
            voice: "verse",
        }),
    })

    if (!tokenResponse.ok) {
        return
    }
    const tokenData = await tokenResponse.json()
    console.log(tokenData)
    return tokenData
}

async function init() {
    // Get an ephemeral key from your server - see server code below
    const data = await login();
    const EPHEMERAL_KEY = data.client_secret.value;


}

//init();

/* import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(123123, result.choices[0].message));
*/
