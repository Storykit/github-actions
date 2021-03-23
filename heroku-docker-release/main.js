const { exec } = require("@actions/exec");
const { getInput, setFailed, debug } = require("@actions/core");

async function buildDockerImage() {
  try {
    const appName = getInput("heroku-app-name");
    const formation = getInput("heroku-app-formation");
    const docker = `docker build -t registry.heroku.com/${appName}/${formation} --build-arg NPM_TOKEN=${process.env.NPM_TOKEN} .`;
    debug(docker);
    await exec(docker);
  } catch (err) {
    setFailed(`failed building docker image: ${err}`);
  }
}

async function loginToHeroku() {
  try {
    const password = getInput("heroku-api-key");
    const login = getInput("heroku-user-email");
    await exec(
      `echo ${password} | docker login --username=${login} registry.heroku.com --password-stdin`
    );
  } catch (err) {
    setFailed(`failed logging in to heroku: ${err}`);
  }
}

async function pushToHeroku() {
  try {
    const password = getInput("heroku-api-key");
    const appName = getInput("heroku-app-name");
    await exec(
      `export HEROKU_API_KEY=${password} && heroku container:push web --app ${appName}`
    );
  } catch (err) {
    setFailed(`failed pushing to heroku: ${err}`);
  }
}

async function releaseToHeroku() {
  try {
    const password = getInput("heroku-api-key");
    const appName = getInput("heroku-app-name");
    await exec(
      `export HEROKU_API_KEY=${password} && heroku container:release web --app ${appName}`
    );
  } catch (err) {
    setFailed(`failed releasing to heroku: ${err}`);
  }
}

async function run() {
  await buildDockerImage();
  await loginToHeroku();
  await pushToHeroku();
  await releaseToHeroku();
}

run();
