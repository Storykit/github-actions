const exec = require("@actions/exec");
const core = require("@actions/core");

async function run() {
  const token = core.getInput("repo-token");
  const dockerfileLocation = core.getInput("dockerfile-location");
  const username = process.env.GITHUB_ACTOR;
  const imageName = core.getInput("image-name").toLowerCase();
  const githubRepo = process.env.GITHUB_REPOSITORY.toLowerCase();
  const tag = core.getInput("tag").toLowerCase();
  const tags = core.getInput("tags").toLowerCase().trim().split(',');
  const fullImageReferences = tags.map(tag => (`-t docker.pkg.github.com/${githubRepo}/${imageName}:${tag}`))
  const fullImageReference = `-t docker.pkg.github.com/${githubRepo}/${imageName}:${tag}`;
  try {
    await exec.exec(
      `docker login docker.pkg.github.com -u ${username} -p ${token}`
    );
  } catch (err) {
    core.setFailed(`action failed with error: ${err}`);
  }
  try {
    await exec.exec(
      `docker build ${fullImageReferences || fullImageReference} ${dockerfileLocation}`
    );
  } catch (err) {
    core.setFailed(`action failed with error: ${err}`);
  }
  try {
    await exec.exec(`docker push ${fullImageReference}`);
  } catch (err) {
    core.setFailed(`Review the logs above, most likely you are using a package name associated with a different repository.  Rename your Image to fix. https://help.github.com/en/github/managing-packages-with-github-packages/about-github-packages#managing-packages for more information`);
  }
  core.setOutput("imageUrl", fullImageReference);
}

run();

