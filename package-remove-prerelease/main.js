#!/usr/bin/env node

const { exec } = require("@actions/exec");
const { getInput, setFailed, setOutput, debug, setSecret } = require("@actions/core");
const { Octokit } = require("@octokit/rest");
const { context } = require('@actions/github')

const owner = context.payload.organization.login;
const repo = context.payload.repository.name;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const pullRequestFix = getInput('pull-request-fix');

const git = new Octokit(GITHUB_TOKEN);

const run = async () => {
  try {
    const { data: tagList } = await git.repos.listTags({
      owner,
      repo
    });

    if (!pullRequestFix.includes('pr')) {
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
          authorization: `token ${GITHUB_TOKEN}`,
        },
      }
      return git.request('DELETE /repos/:owner/:repo/git/refs/:ref', options)
        .then((response) => {
          if (response.status === 204) {
            debug(`Removed tag: ${tag}`);
          } else {
            debug(`Status: ${response.status}`)
            debug(`Was not able to remove tag: ${tag}`);
          }
        })
        .catch(err => {
          debug(`Problem removing tag: ${tag}`)
          return Promise.reject(err);
        })
    })

    await Promise.all(tagsToRemovePromise)

    const env = {
      INPUT_TOKEN: process.env.NODE_AUTH_TOKEN
    }
    await exec('npm view @storykit/models@1.2.1-pr10.7', { env }).catch(err => debug(err))
    await exec('npm', ['config', 'ls', '-l'], { env }).catch(err => debug(err))
    await exec('npm', ['whoami'], { env }).catch(err => debug(err))

    setOutput('removed-releases', tags.join());
  } catch (err) {
    setFailed(err)
  }
}

run();


