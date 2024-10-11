import React, { useState } from "react";

const UserForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      onSubmit(username);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default UserForm;
