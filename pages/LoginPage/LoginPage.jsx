import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_URL;
const loginURL = `${baseURL}/login`;
console.log(loginURL);

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(loginURL, {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      console.log("Response from server after log in:", response.data);
      setIsLoggedIn(true);
      sessionStorage.setItem("JWTtoken", response.data.token);
      console.log("Token stored in session storage:", response.data.token);
    } catch (error) {
      setIsLoginError(true);
      setErrorMessage(
        `${error.response.data.error.mesage}. Problem with login.`
      );
    }
    navigate("/home");
  };

  return (
    <section>
      <form className="login__container--login" onSubmit={handleLogin}>
        <div className="login__input">
          <label className="login__label">Username</label>
          <input type="text" name="username" />
        </div>
        <div className="login__input">
          <label className="login__label">Password</label>
          <input type="password" name="password" />
        </div>
        <div className="login__buttons">
          <button type="submit" className="login__button">
            Log in
          </button>
          <button type="cancel" className="login__cancel">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
