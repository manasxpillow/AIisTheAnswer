"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YargsError = exports.getCli = exports.yarg = void 0;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
exports.yarg = (0, yargs_1.default)(helpers_1.hideBin(process.argv));
const topBanner = `Abhishek talks: is an interactive commandline cli for chatGPT`;
const bottomBanner = `feel free to call me lord`;
function getCli() {
    const cli = exports.yarg
        .usage(topBanner)
        .epilogue(bottomBanner);
    return cli;
}
exports.getCli = getCli;
class YargsError extends Error {
}
exports.YargsError = YargsError;
const cli = getCli();
cli.fail((msg, err) => {
    if (msg) {
        // Show command help message when no command is provided
        if (msg.includes("Not enough non-option arguments")) {
            exports.yarg.showHelp();
            // eslint-disable-next-line no-console
            console.log("\n");
        }
    }
    const errorMessage = err !== undefined ? (err instanceof YargsError ? err.message : err.stack) : msg || "Unknown error";
    // eslint-disable-next-line no-console
    console.error(` ✖ ${errorMessage}\n`);
    process.exit(1);
}).parse();
