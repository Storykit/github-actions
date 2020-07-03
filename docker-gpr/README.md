# Docker-GPR 🐳

A GitHub Action to upload Docker images to the GitHub Package Registry.  

**For this Action to work you need to have [access to GPR](https://github.com/features/package-registry)**

## Usage

### Action Options:

|Parameter|Description|Default Value|Required|
|:---:|---|---|:---:|
|`repo-token`|Access token allowing authentication to the GitHub API.  `GITHUB_TOKEN` is recommended.|No token was supplied... now you know why things broke!|:white_check_mark:|
|`image-name`|Desired name for your Docker image||:white_check_mark:|
|`dockerfile-location`|The location in the repo where the Dockerfile is|.|
|`tag`|Desired tag for your Docker image.|`COMMIT_SHA`||
|`tags`| Multiple tags for your Docker image.|`COMMIT_SHA`||
