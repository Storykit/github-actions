const { exec } = require("@actions/exec");
const { getInput, setFailed, setOutput, debug, setSecret } = require("@actions/core");

const BUILD_ARGS = ['NPM_TOKEN'];

const parseBuildArgs = () => {
  const envValueExists = BUILD_ARGS.some(env => !!process.env[env]);
  if (!envValueExists) { return []; }

  return BUILD_ARGS.filter(env => !!process.env[env])
    .map(env => (`--build-arg ${env}=${process.env[env]}`));
}

const getBranchName = () => {
  const ref = process.env.GITHUB_REF;
  const pr_ref = process.env.GITHUB_HEAD_REF;
  debug(ref);
  debug(pr_ref);
  if (ref && /\/development|\/master/.test(ref)) {
    return ref.replace('refs/heads/', '');
  } else if (pr_ref && /\/pull\//.test(ref)) {
    return pr_ref.replace('/', '-');
  }
}

const parseHeadTag = (packagePath) => {
  const headTag = [];
  const tagHead = getInput("head-tag").toLowerCase().trim();
  debug(tagHead)
  debug(typeof tagHead)
  const shouldTagHead = tagHead === 'true' || tagHead === false;
  if (shouldTagHead) {
    const branchName = getBranchName();
    if (branchName === 'master') {
      headTag.push(`-t ${packagePath}:latest`)
    } else if (branchName === 'development') {
      headTag.push(`-t ${packagePath}:development`)
    } else {
      headTag.push(`-t ${packagePath}:pr-${branchName}`);
    }
  }
  return headTag;
}

async function run() {
  BUILD_ARGS.forEach(ENV => (setSecret(ENV)));
  const token = getInput("repo-token");
  const dockerfileLocation = getInput("dockerfile-location");
  const imageName = getInput("image-name").toLowerCase();
  const tag = getInput("tag").toLowerCase().trim();

  const username = process.env.GITHUB_ACTOR;
  const githubRepo = process.env.GITHUB_REPOSITORY.toLowerCase();

  const packagePath = `docker.pkg.github.com/${githubRepo}/${imageName}`;
  const dockerBuildArr = ['build'];

  const parsedBuildArgs = parseBuildArgs();
  dockerBuildArr.push(...parsedBuildArgs);

  const parsedHeadTags = parseHeadTag(packagePath);
  dockerBuildArr.push(...parsedHeadTags);

  dockerBuildArr.push(`-t ${packagePath}:${tag}`);
  dockerBuildArr.push(dockerfileLocation);

  try {
    await exec(
      `docker login docker.pkg.github.com -u ${username} -p ${token}`
    );
  } catch (err) {
    setFailed(`action failed with error: ${err}`);
  }
  try {
    debug(dockerBuildArr)
    await exec(`docker ${dockerBuildArr.join(' ')}`);
  } catch (err) {
    setFailed(`action failed with error: ${err}`);
  }
  try {
    await exec(`docker push ${packagePath}`);
  } catch (err) {
    setFailed(`Review the logs above, most likely you are using a package name associated with a different repository.  Rename your Image to fix. https://help.github.com/en/github/managing-packages-with-github-packages/about-github-packages#managing-packages for more information`);
  }
  setOutput("imageUrl", packagePath);
}

run();

