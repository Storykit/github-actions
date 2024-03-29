# Docker-GPR

A GitHub Action to upload Docker images to the GitHub Package Registry.  

**For this Action to work you need to have [access to GPR](https://github.com/features/package-registry)**

## Usage

### Action Options:

|Parameter|Description|Default Value|Required|
|:---:|---|---|:---:|
|`repo-token`|Access token allowing authentication to the GitHub API.  `GITHUB_TOKEN` is recommended.|No token was provided.|:white_check_mark:|
|`image-name`|Desired name for your Docker image||:white_check_mark:|
|`dockerfile-location`|The location in the repo where the Dockerfile is|.|
|`tag`|Desired tag for your Docker image.|`COMMIT_SHA`||
|`head-tag`| Tag image with head branch name |`true`||
|`stage-branch`| Branch that represents staging environment (dependent on `head-tag`) |`development`||
|`stage-tag`| Image tag for staging environment (dependent on `head-tag`) |`development`||
|`prod-branch`| Branch that represents production environment (dependent on `head-tag`) |`master`||
|`prod-tag`| Image tag for production environment (dependent on `head-tag`) |`latest`||


### Example: 
build.yaml
```yaml
name: Build image

on: 
  push:
    branches:
      - development
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Build, Tag, Push
      uses: storykit/github-actions/docker-gpr@v1.2.0
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
        image-name: sally
```
