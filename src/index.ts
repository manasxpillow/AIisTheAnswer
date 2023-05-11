import yargsInteractive from 'yargs-interactive';


const options: any = {
    interactive: { default: true },
    prompt: {
        type: "input",
        describe: "Enter your prompt"
    }
};

function prompt() {
    yargsInteractive()
        .usage("$0 <command> [args]")
        .interactive(options)
        .then(result => {
            console.log(result.prompt);
            prompt();
        });
}

prompt()