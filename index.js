const core = require("@actions/core");
const github = require("@actions/github");

try {
  const files = core.getInput("files");

  console.log(`Hello ${files}!`);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);

  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
