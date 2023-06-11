import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  let currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    currentUser = {
      username: "",
      _id: "",
      email: "",
      groups: []
    };
  }
  function getPermissions(user) {
    var results = [];
    user.groups.forEach(element => {
      element.permissions.forEach(p => {
        results.push(p['name']);
      })
    });
    return results;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser._id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {getPermissions(currentUser).map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
