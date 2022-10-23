const core = require("@actions/core");
// const github = require("@actions/github");
const glob = require("@actions/glob");

const run = async () => {
  try {
    const missingFiles = [];

    const fileNamesInput = core.getInput("files");

    const files = fileNamesInput.split(",").map((file) => file.trim());

    const globOptions = {
      followSymbolicLinks: false,
      // core.getInput("follow-symbolic-links").toUpper() !== "FALSE",
    };

    const globber = await glob.create(files.join("\n"), globOptions);

    for await (const file of globber.globGenerator()) {
      console.log(file);
    }

    console.log(`Files to look for: ${fileNamesInput}`);

    console.log(`Files: ${files}`);

    // await Promise.all(
    //   files.map(async (file) => {
    //     const isPresent = await checkExistence(file);

    //     if (!isPresent) {
    //       missingFiles.push(file);
    //     }
    //   })
    // );

    // if (missingFiles.length > 0) {
    //   console.log("Missing files:", missingFiles);
    // }

    // await Promise.all(
    //   fileList.map(async (file: string) => {
    //     const isPresent = await checkExistence(file)
    //     if (!isPresent) {
    //       missingFiles.push(file)
    //     }
    //   })
    // )

    // // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);

    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    // core.setFailed(error.message);
    console.log("FAILED:", error);
  }
};

run();
