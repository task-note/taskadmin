import React, {useState, useRef} from "react";
import AuthService from "../services/auth.service";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassord = () => {
    const form = useRef();
    const [searchParams, ] = useSearchParams();
    const [passwordErr, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    const navigate = useNavigate();

    const [token, ] = useState(searchParams.get("token"));

    const handleChangePassword = (e) => {
        e.preventDefault();
        setLoading(true);
        if (newPasswordConfirm !== newPassword) {
            setPasswordError(true);
            setLoading(false);
            return;
        }
        setPasswordError(false);
        AuthService.changepassword(token, newPassword).then(
            () => {
                navigate("/login");
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
    };

    const onInputPassword = (e) => {
        setNewPassword(e.target.value);
    }
    const onVerifyPassword = (e) => {
        setNewPasswordConfirm(e.target.value);
    }

    return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleChangePassword} ref={form}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <div>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={newPassword}
                onChange={onInputPassword}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="newPasswordConfirm">Confirm New Password</label>
            <div>
              <input
                type="password"
                className="form-control"
                name="newPasswordConfirm"
                onChange={onVerifyPassword}
                value={newPasswordConfirm}
              />
              {passwordErr && (<div className="invalid-feedback d-block">
                Password doesn't match your input, please correct them!
              </div>)}
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Change Password</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassord;
