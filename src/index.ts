import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

export const yarg = yargs((hideBin as (args: string[]) => string[])(process.argv))

const topBanner  = `Abhishek talks: is an interactive commandline cli for chatGPT`
const bottomBanner = `feel free to call me lord`

export function getCli():yargs.Argv{
    const cli  = yarg
    .usage(topBanner)
        .epilogue(bottomBanner)

        return cli;
}
export class YargsError extends Error {}

const cli =getCli()

cli.fail((msg, err) => {
    if (msg) {
        // Show command help message when no command is provided
        if (msg.includes("Not enough non-option arguments")) {
            yarg.showHelp()
            // eslint-disable-next-line no-console
            console.log("\n")
        }
    }

    const errorMessage =
        err !== undefined ? (err instanceof YargsError ? err.message : err.stack) : msg || "Unknown error"

    // eslint-disable-next-line no-console
    console.error(` ✖ ${errorMessage}\n`)
    process.exit(1)
}).parse()