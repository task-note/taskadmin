import React, { useState } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  let currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    currentUser = {
      username: "",
      _id: "",
      email: "",
      isActive: false,
      groups: []
    };
  }
  const [isActive, ] = useState(currentUser["isActive"]);
  console.log('--->', isActive)
  function getPermissions(user) {
    var results = [];
    user.groups.forEach(element => {
      element.permissions.forEach(p => {
        results.push(p['name']);
      })
    });
    return results;
  }

  const resend = function() {
    AuthService.resend(currentUser["email"]);
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
      {!isActive && (
        <p>
          You are not activiated, a activate email has been sent to your email address, please follow the link to activate your account.<br/>
          Not received? <button id="resend" onClick={resend} className="btn btn-primary btn-sm">Resend</button>
        </p>
      )}
      {isActive && (
      <ul>
        {getPermissions(currentUser).map((role, index) => <li key={index}>{role}</li>)}
      </ul>)}
    </div>
  );
};

export default Profile;
