# Actions
**Overview:**

This repository holds a collection of GitHub Actions for Storykit Org.

**Actions List**

Each Action is located in a sub-directory in this repository. Documentation for use can be found along side the source code for the Action.

- [docker-gpr](https://github.com/Storykit/github-actions/tree/master/docker-gpr)

## Helpful Links For Consuming These Actions

- How to create an [API access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
- How to add repository [secrets](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables)


### Creating a new Action.
1. Create a PR and a do a new subfolder.
2. Start building your action and use `storykit/github-actions/something_cool@PR_NAME_ON_GIT` in the `uses` field for your action.
3. Happy developing!