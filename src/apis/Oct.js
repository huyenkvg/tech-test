import { message } from "antd";
import { Octokit, App } from "https://cdn.skypack.dev/octokit?dts";

const octokit = new Octokit({});
const globalCheck = (ret) => {
  switch (ret.status) {
    case 401:
    case 403:
      //countdown 5 times befor logout ...
      break;
    case 404:
      //not found ...
      // message.error("Not found");
      break;
    case 500:
      //server error ...
      // message.error("Server error");
      break;
    default:
      // not handle ...
      return ret;
  }
}


const getUser = async () => {
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  // const octokit = new Octokit({ auth: `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` });

  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user

  const {
    data: { login },
  } = await octokit.request('GET /user', {})
  console.log("Hello, %s", login);
}

const getListRepos = async (username, filter) => {
  return octokit.request('GET /users/{username}/repos', {
    username,
    ...filter
  }).catch((err) => {
    globalCheck(err);
  });
}
const getARepo = async (username, repo) => {
  return octokit.request('GET /repos/{owner}/{repo}', {
    owner: username,
    repo
  }).catch((err) => {
    globalCheck(err);
  });
}
const getRepoContribution = async (username, repo) => {
  return octokit.request('GET /repos/{owner}/{repo}/contributors', {
    owner: username,
    repo
  }).catch((err) => {
    globalCheck(err);
  });
}
const getRepoContent = async (username, repo, path) => {
  return octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: username,
    repo,
    path
  })
}
const getReadmeContent = async (url) => {
  return octokit.request('GET {url}', {
    url
  })
}
export {
  getUser,
  getListRepos,
  getARepo,
  getRepoContribution,
  getRepoContent,


};