const { getInput, debug, setSecret } = require("@actions/core");

const containerRegistry = 'ghcr.io';

const dockerfileLocation = getInput("dockerfile-location");
const imageName = getInput("image-name").toLowerCase();
const tagHead = getInput("head-tag").toLowerCase().trim();
const stageBranch = getInput("stage-branch").toLowerCase().trim();
const stageTag = getInput("stage-tag").toLowerCase().trim();
const prodBranch = getInput("prod-branch").toLowerCase().trim();
const prodTag = getInput("prod-tag").toLowerCase().trim();
const tag = getInput("tag").toLowerCase().trim().slice(0, 8);

const githubRepo = process.env.GITHUB_REPOSITORY.toLowerCase();

const packagePath = `${containerRegistry}/${githubRepo}/${imageName}`;

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
    // Replace characters that isn't allowed in a docker tag name
    return pr_ref.replace(/(^\.)|(^-)|[^A-Za-z0-9-_.]/g, '-').slice(0, 128);
  }
}

const parseHeadTag = (packagePath) => {
  const headTag = [];
  const shouldTagHead = tagHead === 'true' || tagHead === false;
  if (shouldTagHead) {
    const branchName = getBranchName();
    if (branchName === prodBranch) {
      headTag.push(`-t ${packagePath}:${prodTag}`)
    } else if (branchName === stageBranch) {
      headTag.push(`-t ${packagePath}:${stageTag}`)
    } else {
      headTag.push(`-t ${packagePath}:pr-${branchName}`);
    }
  }
  return headTag;
}

const getBuildCommand = () => {
  BUILD_ARGS.forEach(ENV => (setSecret(ENV)));

  const dockerBuildArr = ['build'];

  const parsedBuildArgs = parseBuildArgs();
  dockerBuildArr.push(...parsedBuildArgs);

  const parsedHeadTags = parseHeadTag(packagePath);
  dockerBuildArr.push(...parsedHeadTags);

  dockerBuildArr.push(`-t ${packagePath}:${tag}`);
  dockerBuildArr.push(dockerfileLocation);

  return `docker ${dockerBuildArr.join(' ')}`;
}

const getLoginCommand = () => {
  const username = process.env.GITHUB_ACTOR;
  const token = getInput("repo-token");

  return `docker login ghcr.io -u ${username} -p ${token}`;
}

const getPushCommand = () => {
  return `docker push ${packagePath} --all-tags`;
}



module.exports = {
  getLoginCommand,
  getBuildCommand,
  getPushCommand,
  packagePath
}

