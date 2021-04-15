import React, { useEffect } from "react";
import { getGithubRepos } from "../../actions/profile";
import { connect } from "react-redux";

function ProfileGithub({ username, getGithubRepos, repos }) {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <div>Loading</div>
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    repos: state.profile.repos,
  };
}

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
