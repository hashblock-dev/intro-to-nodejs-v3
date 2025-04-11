import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    (yargs) => {
      return yargs.positional("note", {
        describe: "The content of the note to create",
        type: "string",
      });
    },
    (argv) => {
      console.log(argv.note);
    }
  )
  .options("tags", {
    alias: "t",
    describe: "tags to add to the note",
    type: "string",
  })
  .demandCommand(1)
  .parse();
