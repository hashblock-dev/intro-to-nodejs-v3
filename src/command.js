import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command("curl <url>", "fetch the contents of the URL", () => {
    console.info(process.argv);
  })
  .demandCommand(1)
  .parse();
