const { exec } = require("@actions/exec");
const { getInput, setFailed, setOutput } = require("@actions/core");

const parseTag = (tag, packagePath) => {
  if (!tag.include(',')) {
    return `-t ${packagePath}:${tag}`
  } else {
    return tag.split(',').tag.map(t => (`-t ${packagePath}:${t}`)).join(' ');
  }
}

async function run() {
  const token = getInput("repo-token");
  const dockerfileLocation = getInput("dockerfile-location");
  const imageName = getInput("image-name").toLowerCase();
  const tag = getInput("tag").toLowerCase().trim();

  const username = process.env.GITHUB_ACTOR;
  const githubRepo = process.env.GITHUB_REPOSITORY.toLowerCase();

  const packagePath = `docker.pkg.github.com/${githubRepo}/${imageName}`;

  const parsedTag = parseTag(tag, packagePath);
  try {
    await exec(
      `docker login docker.pkg.github.com -u ${username} -p ${token}`
    );
  } catch (err) {
    setFailed(`action failed with error: ${err}`);
  }
  try {
    await exec(
      `docker build ${parsedTag} ${dockerfileLocation}`
    );
  } catch (err) {
    setFailed(`action failed with error: ${err}`);
  }
  try {
    await exec(`docker push ${packagePath}`);
  } catch (err) {
    setFailed(`Review the logs above, most likely you are using a package name associated with a different repository.  Rename your Image to fix. https://help.github.com/en/github/managing-packages-with-github-packages/about-github-packages#managing-packages for more information`);
  }
  setOutput("imageUrl", fullImageReference);
}

run();

