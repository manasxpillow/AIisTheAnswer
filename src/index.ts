import yargsInteractive from 'yargs-interactive';
import axios from 'axios';

const OPEN_API_KEY = ""
const MAX_CONTEXT_LENGTH = 10
const messages: { role: string, content: string }[] = []

async function apiCall(prompt: string): Promise<string> {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPEN_API_KEY
        }
        messages.push({ "role": "user", "content": prompt })
        const data = {
            "model": "gpt-3.5-turbo",
            "messages": messages,
            "temperature": 0.8,
        }
        const response = await axios.post("https://api.openai.com/v1/chat/completions", data, { headers });
        const result = response.data.choices[0].message.content
        messages.push({ "role": "assistant", "content": result })
        if (messages.length > MAX_CONTEXT_LENGTH)
            messages.shift()
        return result
    } catch (error) {
        console.error(error);
        return "Something went wrong..."
    }
}


const options: any = {
    interactive: { default: true },
    prompt: {
        type: "input",
        describe: "Enter your prompt"
    }
};

function prompt() {
    yargsInteractive()
        .usage("$0 <command>")
        .interactive(options)
        .then(result => {
            apiCall(result.prompt).then((res) => {
                console.log(res);
                prompt();
            })
        });
}

prompt()