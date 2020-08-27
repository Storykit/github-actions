const { exec } = require("@actions/exec");
const { getInput, setFailed, setOutput, debug, setSecret } = require("@actions/core");
const { Octokit } = require("@octokit/rest");
const { context } = require('@actions/github')

const owner = context.payload.organization.login;
const repo = context.payload.repository.name;

const token = getInput('github-token');
const pullRequestFix = getInput('pull-request-fix');

const git = new Octokit(token);

const run = async () => {
  try {
    const { data: tagList } = await git.repos.listTags({
      owner,
      repo
    });

    if(!pullRequestFix.include('pr')){
      setFailed('pull-request-fix must include snippet "pr" somewhere');
    }

    const tags = tagList.filter(tag => tag.name.includes(pullRequestFix))
      .map(tag => (tag.name));

    const tagsToRemovePromise = tags.map(tag => {
      const options = {
        owner: owner.toLocaleLowerCase(),
        repo: repo.toLocaleLowerCase(),
        ref: `tags/${tag}`,
        headers: {
          authorization: `token ${token}`,
        },
      }
      return git.request('DELETE /repos/:owner/:repo/git/refs/:ref', options)
        .catch(err => {
          debug(`Problem removing tag: ${tag}`)
          return Promise.reject(err);
        })
    })

    await Promise.all(tagsToRemovePromise)

    setOutput('removed-releases', tags.join());
  } catch (err) {
    setFailed(err)
  }
}

run();
