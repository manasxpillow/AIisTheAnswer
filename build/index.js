"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_interactive_1 = __importDefault(require("yargs-interactive"));
const axios_1 = __importDefault(require("axios"));
const OPEN_API_KEY = "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";
const context = [];
const max_context_length = 10;
function apiCall(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + OPEN_API_KEY
            };
            context.push({ "role": "user", "content": prompt });
            const data = {
                "model": "gpt-3.5-turbo",
                "messages": context,
                "temperature": 0.8,
            };
            const response = yield axios_1.default.post("https://api.openai.com/v1/chat/completions", data, { headers });
            const result = response.data.choices[0].message.content;
            context.push({ "role": "assistant", "content": result });
            if (context.length > max_context_length) {
                context.shift();
            }
            return result;
        }
        catch (error) {
            console.error(error);
            return "Something went wrong...";
        }
    });
}
const options = {
    interactive: { default: true },
    prompt: {
        type: "input",
        describe: "Enter your prompt"
    }
};
function prompt() {
    (0, yargs_interactive_1.default)()
        .usage("$0 <command>")
        .interactive(options)
        .then(result => {
        apiCall(result.prompt).then((res) => {
            console.log(res);
            prompt();
        });
    });
}
prompt();
