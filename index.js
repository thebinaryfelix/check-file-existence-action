const core = require("@actions/core");
// const github = require("@actions/github");
const glob = require("@actions/glob");

const run = async () => {
  try {
    const missingFiles = [];

    const fileNamesInput = core.getInput("files");

    core.info(`Files to look for: ${fileNamesInput}`);

    const files = fileNamesInput
      .split(",")
      .map((file) => file.trim())
      .join("\n");

    const globOptions = {
      followSymbolicLinks: false,
      // core.getInput("follow-symbolic-links").toUpper() !== "FALSE",
    };

    core.info(`Patterns: ${files}`);

    const globber = await glob.create(files, globOptions);

    const computedFiles = await globber.glob();

    core.info("Computed files: ", computedFiles);

    if (computedFiles.length < fileNamesInput.length) {
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
