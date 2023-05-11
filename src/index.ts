import yargsInteractive from 'yargs-interactive';
import axios from 'axios';


async function apiCall(prompt: string): Promise<string> {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        }
        const data = {
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": prompt }],
            "temperature": 0.8
        }
        const response = await axios.post("https://api.openai.com/v1/chat/completions", data, { headers });
        return response.data.choices[0].message.content
    } catch (error) {
        console.error(error);
        return "Something went wrong"
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