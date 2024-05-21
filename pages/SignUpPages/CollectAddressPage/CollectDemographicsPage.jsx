import "./CollectDemographicsPage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Text from "../../../components/FormFields/TextForDemographics/TextForDemographics";
import Address from "../../../components/FormFields/Address/Address";
import Email from "../../../components/FormFields/EmailField/EmailField";
import Button from "../../../components/Buttons/SubmitButton/Button";

const baseURL = import.meta.env.VITE_APP_BASE_URL;
const signupURL = `${baseURL}/users/register`;
console.log(signupURL)

const CollectDemographicsPage = () => {

  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const submitRegistration = async (event) => {
      event.preventDefault();

      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      try {
        const response = await axios.post(signupURL, {
          first_name: event.target.first_name.value,
          last_name: event.target.last_name.value,
          email: event.target.email.value,
          street_address: event.target.street_address.value,
          street_address2: event.target.street_address2.value,
          city: event.target.city.value,
          state: event.target.state.value,
          zipcode: event.target.zipcode.value,
          username: username,
          password_hash: password
        });
        console.log(response)
        console.log("Response from server after signup:", response.data);
        setIsSignedUp(true);
        console.log("Token stored in session storage:", response.data.token);
        sessionStorage.setItem("JWTtoken", response.data.token);
      } catch (errror) {
        setErrorMessage(
          `${errorMessage}: Something went wrong. Please try again.`);
      }
      navigate("/home");
    }

  return (
    <div>
      <form className="registration-form" onSubmit={submitRegistration}>
        <Text
        label="First Name"
        label_name="first_name" />
        <Text
        label="Last Name"
        label_name="last_name" />
        <Email
        label="Email"
        label_name="email" />
        <Address />
        <Button 
        type="submit"
        classname="button__submit"
        button_label="Submit" />
      </form>
      </div>
  )
}

export default CollectDemographicsPage