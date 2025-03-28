import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    // Check for the authToken cookie by sending a request to the backend
    axios
      .get("https://dyari1.onrender.com/api/validateToken", { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
      })

      .catch((error) => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogin = (credentials) => {
    axios
      .post("https://dyari1.onrender.com/api/login", credentials, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.shop);
        console.log(user);
        navigate("/")
      })
      .catch((error) => {
        console.error("Login failed", error);
        setLoginError("Invalid email or password.");
      });
  };
  const handleGoogleLogin = async (googleResponse) => {
    try {
      const { credential } = googleResponse;

      // Send the token to your backend for validation
      const response = await axios.post(
        "https://dyari1.onrender.com/api/auth/google",
        { token: credential },
        { withCredentials: true }
      );
      console.log(response.data.user)
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleLogout = () => {
    axios
      .post("https://dyari1.onrender.com/api/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate("/auth");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginError,
        setUser,
        handleLogin,
        handleGoogleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
