import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.code == 200) {
        localStorage.setItem("user", JSON.stringify(response.data.object["user"]));
        localStorage.setItem("accessToken", response.data.object["accessToken"]);
        localStorage.setItem("refreshToken", response.data.object["user"]["refreshToken"]);
      }
      else {
        throw new Error(JSON.stringify(response.data.object))
      }

      return response.data.object;
    });
};

const logout = () => {
  var token = localStorage.getItem('accessToken')
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return axios.post(API_URL + "logout", null, { 
    headers: {
      'Authorization': `Basic ${token}`
    }
  }).then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
