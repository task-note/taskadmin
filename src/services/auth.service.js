import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";
const USR_URL = "http://localhost:3000/api/users/"
const BASE_URL = "http://localhost:3000/api/"

const register = (email, password) => {
  const username = email;
  return axios.post(USR_URL + "signup", {
    username,
    email,
    password,
  });
};

const activate = (email, code) => {
  return axios
    .get(BASE_URL + `/public/activate?email=${email}&code=${code}`)
    .then((response) => {
      if (response.data.code === 200) {
        console.log(response.data.object["user"])
        localStorage.setItem("user", JSON.stringify(response.data.object["user"]));
      }
      else {
        throw new Error(JSON.stringify(response.data.object["errors"][0]));
      }

      return response.data.object;
    });
}

const changepassword = (code, newPassword) => {
  return axios
    .post(API_URL + `change-password-by-token/${code}`, {
      newPassword
    }).then((response) => {
      if (response.data.code !== 200) {
        throw new Error(JSON.stringify(response.data.object["errors"][0]));
      }
      return response.data.object;
    });
}

const resend = (email) => {
  var token = localStorage.getItem('accessToken')
  return axios.post(USR_URL + "resend", {
    email,
  }, {
    headers: {
      'Authorization': `Basic ${token}`
    }
  });
}

const generatepassword = (username) => {
  return axios.post(API_URL + 'generate-reset-password', {
    username,
  });
}

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.code === 200) {
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
  try {
    return JSON.parse(localStorage.getItem("user"));
  }
  catch(e) {
    return undefined;
  }
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  resend,
  activate,
  generatepassword,
 changepassword,
}

export default AuthService;
