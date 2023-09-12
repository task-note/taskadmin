import React, {useState, useEffect} from "react";
import AuthService from "../services/auth.service";
import { useSearchParams, useNavigate } from "react-router-dom";

const Activate = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [queryResult, setQueryResult] = useState("Invalid call");
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const code = searchParams.get("code");
  useEffect(() => {
    if (email && code && email.length > 3 && code.length > 3) {
      setSearchParams("");
      AuthService.activate(email, code).then(() => {
        navigate("/profile");
        window.location.reload();
      },
      (error) => {
        console.log(error);
        const resMessage = (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
        setQueryResult(resMessage);
      });
    } 
  }, [email, code, navigate, setSearchParams, setQueryResult]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Failed to activate: {queryResult} </strong> 
        </h3>
      </header>
    </div>
  );
};

export default Activate;
