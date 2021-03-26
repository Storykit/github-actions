const Octocore = require("@actions/core");
process.env.GITHUB_REPOSITORY = 'storykit'

process.env.NPM_TOKEN = 'NPM_TOKEN';
process.env.GITHUB_ACTOR = 'services'

const { getBuildCommand, getLoginCommand, getPushCommand } = require("./docker");

const inputValues = {
  'repo-token': 'ASD123',
  'image-name': 'docker-gpr',
  'head-tag': 'true',
  'stage-branch': 'development',
  'stage-tag': 'development',
  'prod-branch': 'master',
  'prod-tag': 'latest',
  'tag': 'd67b0b3ca9fcae150e554715abe3a01f9dda1268'
}

jest.mock('@actions/core', () => {
  return {
    getInput: (val) => {
      return inputValues[val];
    },
    setSecret: (val) => {
      return val;
    },
    debug: (val) => {
      //console.log(val)
    },
  };
});

describe('docker', () => {
  test('get login command', () => {

    const command = getLoginCommand();

    expect(command).toEqual('docker login docker.pkg.github.com -u services -p ASD123')
  });

  test('get build command with substribg hash tag', () => {
    const command = getBuildCommand();
    const prefixTag = `${process.env.GITHUB_REPOSITORY}/${inputValues["image-name"]}`
    const tagSubString = inputValues.tag.slice(0, 8);
    const hasHashTag = command.includes(`${prefixTag}:${tagSubString}`);

    expect(hasHashTag).toEqual(true);
  });

  test('get build command with development tag', () => {
    process.env.GITHUB_REF = 'refs/heads/development';

    const command = getBuildCommand();
    const prefixTag = `${process.env.GITHUB_REPOSITORY}/${inputValues["image-name"]}`
    const hasDevelopmentTag = command.includes(`${prefixTag}:${inputValues["stage-tag"]}`);

    expect(hasDevelopmentTag).toEqual(true);
  });

  test('get build command with master tag', () => {
    process.env.GITHUB_REF = 'refs/heads/master';
    const command = getBuildCommand();
    const prefixTag = `${process.env.GITHUB_REPOSITORY}/${inputValues["image-name"]}`
    const hasMasterTag = command.includes(`${prefixTag}:${inputValues["prod-tag"]}`);

    expect(hasMasterTag).toEqual(true);
  });

  test('get build command with pull request tag', () => {
    process.env.GITHUB_REF = 'refs/pull/1/head';
    process.env.GITHUB_HEAD_REF = 'feature-branch-1';

    const command = getBuildCommand();
    const prefixTag = `${process.env.GITHUB_REPOSITORY}/${inputValues["image-name"]}`
    const hasPRTag = command.includes(`${prefixTag}:pr-feature-branch-1`);

    expect(hasPRTag).toEqual(true);
  });

  test('get build command with build arg', () => {
    const command = getBuildCommand();

    const hasBuildArg = command.includes("--build-arg NPM_TOKEN=NPM_TOKEN");

    expect(hasBuildArg).toEqual(true);
  });

  test('get build command', () => {
    const command = getPushCommand();

    const prefixTag = `${process.env.GITHUB_REPOSITORY}/${inputValues["image-name"]}`

    expect(command).toEqual(`docker push docker.pkg.github.com/${prefixTag} --all-tags`)
  });
});

