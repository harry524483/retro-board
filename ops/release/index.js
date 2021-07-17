const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

const GITHUB_REPO = 'harry524483/retro-board';
const GITHUB_TOKEN = '';
const GITHUB_USER_EMAIL = 'harinder.singh@sainsburys.co.uk';
const GITHUB_USER_NAME = 'harry524483';
const GITHUB_REPO_URL = `https://${GITHUB_TOKEN}:x-oauth-basic@github.com/${GITHUB_REPO}`;

const GIT_REMOTE_WITH_AUTH = `git remote set-url origin ${GITHUB_REPO_URL}`;
const GIT_GLOBAL_CONFIG = `git config --global user.email "${GITHUB_USER_EMAIL}" && git config --global user.name "${GITHUB_USER_NAME}"`;
const LERNA_CHANGED_COMMAND = 'yarn --silent lerna changed --all --json';
const LERNA_VERSION_COMMAND =
  'yarn lerna version --yes --no-push --no-git-tag-version --conventional-commits';
const LERNA_LIST_ALL_COMMAND = 'yarn --silent lerna list --all --json';
const COMMIT_RELEASE = 'git commit -am "chore(release): version update"';

const execTagRelease = async (changedPackages, allPackages) => {
  await Promise.all(
    changedPackages.map(async ({ name }) => {
      const { version } = allPackages.find((package) => package.name === name);
      await execPromise(
        `git tag -a -m "${name}@${version}" "${name}@${version}"`
      );
    })
  );
};

const release = async () => {
  try {
    console.log('Set git remote with auth');
    // await execPromise(GIT_REMOTE_WITH_AUTH);

    console.log('Set Git global config (user.name / user.email)');
    // await execPromise(GIT_GLOBAL_CONFIG);

    console.log('Finding changed packages');
    const { stdout: changed } = await execPromise(LERNA_CHANGED_COMMAND);
    const changedPackages = JSON.parse(changed);

    console.log('Versioning');
    await execPromise(LERNA_VERSION_COMMAND);

    console.log('Finding packages and versions');
    const { stdout: allPackages } = execPromise(LERNA_LIST_ALL_COMMAND);

    console.log('Commiting');
    // execPromise(COMMIT_RELEASE);

    console.log('Tagging');
    await execTagRelease(changedPackages, allPackages);
  } catch (error) {
    console.log('error', error);
  }
};

release();
