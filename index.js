const core = require("@actions/core");
// const github = require("@actions/github");
const glob = require("@actions/glob");

const globOptions = {
  followSymbolicLinks: false,
  // core.getInput("follow-symbolic-links").toUpper() !== "FALSE",
};

const run = async () => {
  try {
    const missingFiles = [];

    const fileNamesInput = core.getInput("files");

    core.info(`Files to look for: ${fileNamesInput}`);

    const files = fileNamesInput.split(",").map((file) => file.trim());

    const patterns = files.join("\n");

    core.info(`Patterns: ${patterns}`);

    const globber = await glob.create(patterns, globOptions);

    const computedFiles = await globber.glob();

    core.info(`Computed files: ${computedFiles}`);

    if (computedFiles.length < files.length) {
      core.setOutput("files_exists", "false");
    } else {
      core.setOutput("files_exists", "true");
    }

    // for await (const file of globber.globGenerator()) {
    //   core.info("File of globber: ", file);
    // }

    // // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);

    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
