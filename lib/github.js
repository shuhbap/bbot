const axios = require("axios");

async function githubstalk(user) {
  return new Promise((resolve, reject) => {
    axios.get('https://api.github.com/users/' + user)
      .then(({ data }) => {
        let suhaid = {
          username: data.login,
          name: data.name,
          bio: data.bio,
          id: data.id,
          profile_pic: data.avatar_url,
          url: data.html_url,
          type: data.type,
          isAdmin: data.site_admin,
          company: data.company,
          blog: data.blog,
          location: data.location,
          email: data.email,
          publicRepos: data.public_repos,
          publicGists: data.public_gists,
          followers: data.followers,
          following: data.following,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        };
        resolve(suhaid);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = githubstalk;
