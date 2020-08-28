#!/usr/bin/env node

const { exec } = require("@actions/exec");
const { getInput, setFailed, setOutput, debug } = require("@actions/core");
const { Octokit } = require("@octokit/rest");
const { context } = require('@actions/github')

const owner = context.payload.organization.login.toLocaleLowerCase();
const repo = context.payload.repository.name.toLocaleLowerCase();

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

    const env = {
      INPUT_TOKEN: process.env.NODE_AUTH_TOKEN
    }

    let removedGitTags = [];
    let removedNpmVersions = [];

    const tagsToRemovePromise = tags.map(tag => {
      const options = {
        owner: owner,
        repo: repo,
        ref: `tags/${tag}`,
        headers: {
          authorization: `token ${GITHUB_TOKEN}`,
        },
      }
      return git.request('DELETE /repos/:owner/:repo/git/refs/:ref', options)
        .then((response) => {
          if (response.status === 204) {
            removedGitTags.push(tag);
            debug(`Removed tag: ${tag}`);
            return exec(`npm deprecate @${owner}/${repo}@${tag} "Beta release deprecated, please use latest version."`, { env })
              .then(() => {
                removedNpmVersions.push(tag);
              })
              .catch(err => (debug(err)));
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

    setOutput('removed-git-tags', removedGitTags.join('\n'));
    setOutput('removed-npm-versions', removedNpmVersions.join('\n'));
  } catch (err) {
    setFailed(err)
  }
}

run();


