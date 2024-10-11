import React, { useState } from "react";
import UserForm from "../UserForm";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserData = async (username) => {
    try {
      setError(null);
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const userData = await userResponse.json();
      setUserData(userData);

      const reposResponse = await fetch(userData.repos_url);
      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
      setUserData(null);
      setRepos([]);
    }
  };

  return (
    <div>
      <h1>GitHub User Search</h1>
      <UserForm onSubmit={fetchUserData} />

      {error && <p>{error}</p>}
      {userData && (
        <div>
          <h2>{userData.name} ({userData.login})</h2>
          <img src={userData.avatar_url} alt="avatar" width={100} />
          <p>{userData.bio}</p>
          <h3>Repositories:</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
