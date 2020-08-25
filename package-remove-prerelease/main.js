const { exec } = require("@actions/exec");
const { getInput, setFailed, setOutput, debug, setSecret } = require("@actions/core");
const { Octokit } = require("@octokit/rest");
const { context } = require('@actions/github')

const { owner, repo } = context.repo()

const token = getInput('github-token');
const pullRequestFix = getInput('pull-request-fix');

const git = new Octokit(token);

const run = async () => {
  const { data: listTagsResponse } = await git.repos.listTags({
    owner,
    repo
  });

  const tags =
    listTagsResponse.map(tag => (tag.name))
      .filter(version => version.includes(pullRequestFix));

  //deleteRef

  setOutput('removed-releases', tags.join());
}

run();
