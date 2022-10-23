const core = require("@actions/core");
// const github = require("@actions/github");
const glob = require("@actions/glob");

const globOptions = {
  followSymbolicLinks: false,
  // core.getInput("follow-symbolic-links").toUpper() !== "FALSE",
};

const getMissingFiles = (inputFiles, computedFiles) => {
  const missingFiles = [];

  const joinedComputedFiles = computedFiles.join(",");

  inputFiles.forEach((file) => {
    console.log(`Checking if file: ${file} exists in computedFiles.`);
    if (joinedComputedFiles.includes(file)) {
      console.log("computedFiles includes file. File exists.");
    } else {
      missingFiles.push(file);
    }
  });

  return missingFiles;
};

const run = async () => {
  const computedFiles = [];

  try {
    const inputFiles = core.getInput("files");

    core.info(`Checking existence of: ${inputFiles}`);

    const formattedFiles = inputFiles.split(",").map((file) => file.trim());

    const pattern = formattedFiles.join("\n");

    const globber = await glob.create(pattern, globOptions);

    for await (const file of globber.globGenerator()) {
      core.info(`Existing file: ${file}`);
      computedFiles.push(file);
    }

    const missingFiles = getMissingFiles(formattedFiles, computedFiles);

    console.log("Missing files:", missingFiles);

    if (missingFiles.length > 0) {
      core.setFailed(
        `Some files are missing: ${missingFiles.split(",").join("\n")}`
      );

      core.setOutput("files_exists", "false");
    } else {
      core.info(`All files exist`);
      core.setOutput("files_exists", "true");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
