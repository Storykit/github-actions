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
          HOME: '.',
        }
      }
    );
  } catch (err) {
    setFailed(`failed logging in to heroku: ${err}`);
  }
}

const containerArgs = [
  'NPM_TOKEN',
  'NODE_ENV',
  'GIT_SHA'
]

async function pushToHeroku() {
  try {
    const password = getInput("heroku-api-key");
    const appName = getInput("heroku-app-name");
    const formation = getInput("heroku-app-formation");
    const args = containerArgs.filter(key => !!process.env[key])
      .map(key => `${key}=${process.env[key]}`);

    await exec(
      `heroku container:push ${formation} --recursive --app ${appName} --arg ${args.join(',')}`,
      null,
      {
        env: {
          'HEROKU_API_KEY': password,
          HOME: '.',
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
    const formation = getInput("heroku-app-formation");
    await exec(
      `heroku container:release ${formation} --app ${appName}`,
      null,
      {
        env: {
          'HEROKU_API_KEY': password,
          HOME: '.',
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
