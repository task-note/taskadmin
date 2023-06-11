import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [usernameErr, setUserNameError] = useState(false);
  const [passwordErr, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    setPasswordError(password.length == 0);
    setUserNameError(username.length == 0);

    if (password.length != 0 && username.length != 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
              />
              {usernameErr && (<div className="invalid-feedback d-block">
                This field is required!
              </div>)}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
              {passwordErr && (<div className="invalid-feedback d-block">
                This field is required!
              </div>)}
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <button style={{ display: "none" }} ref={checkBtn} />
        </form>
      </div>
    </div>
  );
};

export default Login;
