const core = require("@actions/core");
// const github = require("@actions/github");
// const glob = require("@actions/glob");
import glob from "glob";

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

export async function checkExistence(pattern) {
  const globOptions = {
    // follow: !(
    //   (core.getInput('follow_symlinks') || 'true').toUpperCase() === 'FALSE'
    // ),
    // nocase: (core.getInput('ignore_case') || 'false').toUpperCase() === 'TRUE'
  };
  return new Promise((resolve, reject) => {
    glob(pattern, globOptions, (err, files) => {
      console.log("glob pattern:", pattern, "glob files:", files);
      if (err) {
        reject(err);
      } else {
        resolve(files.length > 0);
      }
    });
  });
}

const run = async () => {
  // const computedFiles = [];
  const missingFiles = [];

  try {
    const inputFiles = core.getInput("files");

    core.info(`Checking existence of: ${inputFiles}`);

    const formattedFiles = inputFiles.split(",").map((file) => file.trim());

    // const pattern = formattedFiles.join("\n");

    // const globber = await glob.create(pattern, globOptions);

    // for await (const file of globber.globGenerator()) {
    //   core.info(`Existing file: ${file}`);
    //   computedFiles.push(file);
    // }

    await Promise.all(
      formattedFiles.map(async (file) => {
        const isPresent = await checkExistence(file);
        if (!isPresent) {
          console.log(`File: ${file} IS MISSING!`);
          missingFiles.push(file);
        }
      })
    );

    // const missingFiles = getMissingFiles(formattedFiles, computedFiles);

    console.log("Missing files:", missingFiles);

    if (missingFiles.length > 0) {
      core.setFailed(
        `Some files are missing: ${missingFiles.join("\n")}`
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
