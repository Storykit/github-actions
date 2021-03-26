const { exec } = require("@actions/exec");
const { setFailed, setOutput, debug } = require("@actions/core");
const { getPushCommand, getBuildCommand, getLoginCommand, packagePath } = require('./docker');

async function run() {
  const login = getLoginCommand();
  const build = getBuildCommand();
  const push = getPushCommand()

  try {
    await exec(login);
  } catch (err) {
    setFailed(`action failed with error: ${err}`);
  }
  try {
    debug(build)
    await exec(build);
  } catch (err) {
    setFailed(`action failed with error: ${err}`);
  }
  try {
    await exec(push);
  } catch (err) {
    setFailed(`Review the logs above, most likely you are using a package name associated with a different repository.  Rename your Image to fix. https://help.github.com/en/github/managing-packages-with-github-packages/about-github-packages#managing-packages for more information`);
  }
  setOutput("imageUrl", packagePath);
}

run();

