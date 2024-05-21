import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../../../components/FormFields/TextWithOnChange/TextWithOnChange";
import "./CreateAccountPage.scss";
import Password from "../../../components/FormFields/Password/Password";
import NextButton from "../../../components/Buttons/NextButton/NextButton";


const CreateAccountPage = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNextStep = () => {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
    navigate("/register/step2");
  };

  return (
    <div>
      <Text
        label="username"
        label_name="Username"
        value={username}
        onchange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <Password
        label="password"
        label_name="Password"
        value={password}
        onchange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <NextButton
      button_label="Next"
      onclick={handleNextStep}
      />
    </div>
  );
};

export default CreateAccountPage;
