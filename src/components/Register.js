import React, { useState, useRef } from "react";
import { isEmail } from "validator";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

function isPassValid(pass) {
  return pass.length >= 6 && pass.length < 40;
}

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [emailError, setEmailInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [pwdicon, setPasswordIcon] = useState(faEye);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const validEmail = (e) => {
    setEmailInvalid(!isEmail(e.target.value));
  };
  const validPassword = (e) => {
    const value = e.target.value;
    setPasswordError(!isPassValid(value));
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onTogglePassword = (e) => {
    const password = document.querySelector('#password');
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    if (pwdicon === faEye) {
      setPasswordIcon(faEyeSlash);
    } else {
      setPasswordIcon(faEye);
    }
    password.focus();
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    const email_valid = isEmail(email);
    const passwd_valid = isPassValid(password);
    if (!email_valid) {
      setEmailInvalid(true);
      return;
    }
    if (!passwd_valid) {
      setPasswordError(true);
      return;
    }

    AuthService.register(email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    onBlur={validEmail}
                  />
                  {emailError && (
                    <div className="invalid-feedback d-block">
                      This is not a valid email.
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div>
                  <div className="composite form-control">
                    <input 
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={onChangePassword}
                      onBlur={validPassword}
                      />
                    <FontAwesomeIcon icon={pwdicon} onClick={onTogglePassword}/>
                  </div>
                  {passwordError && (<div className="invalid-feedback d-block">
                    The password must be between 6 and 40 characters.
                  </div>)}
                </div>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
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

export default Register;
