const { exec } = require("@actions/exec");
const { getInput, setFailed } = require("@actions/core");

async function loginToHeroku() {
  try {
    const password = getInput("heroku-api-key");
    const login = getInput("heroku-user-email");
    await exec(
      `heroku container:login`,
      null,
      {
        env: {
          'HEROKU_API_KEY': password,
        }
      }
    );
  } catch (err) {
    setFailed(`failed logging in to heroku: ${err}`);
  }
}

async function pushToHeroku() {
  try {
    const password = getInput("heroku-api-key");
    const appName = getInput("heroku-app-name");
    const formation = getInput("heroku-app-formation");
    await exec(
      `heroku container:push ${formation} --recursive --app ${appName} --arg NPM_TOKEN=${process.env.NPM_TOKEN}`,
      null,
      {
        env: {
          'HEROKU_API_KEY': password,
        }
      }
    );
  } catch (err) {
    setFailed(`failed pushing to heroku: ${err}`);
  }
}

async function releaseToHeroku() {
  try {
    const password = getInput("heroku-api-key");
    const appName = getInput("heroku-app-name");
    const formation = 
    await exec(
      `heroku container:release ${formation} --app ${appName}`,
      null,
      {
        env: {
          'HEROKU_API_KEY': password,
        }
      }
    );
  } catch (err) {
    setFailed(`failed releasing to heroku: ${err}`);
  }
}

async function run() {
  await loginToHeroku();
  await pushToHeroku();
  await releaseToHeroku();
}

run();
