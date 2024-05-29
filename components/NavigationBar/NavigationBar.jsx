import "./NavigationBar.scss";
import logo_white from "../../src/assets/logo/pokeswap_logo_white.svg";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <Link
        className="navbar__link"
        to={{
          pathname: `/`,
        }}
      >
        <div className="navbar__logo-container">
          <img className="navbar__logo" src={logo_white}/>
        </div>
      </Link>
      <ul className="navbar__menu">
        <Link
          className="navbar__link"
          to={{
            pathname: `/login`,
          }}
        >
          <li className="navbar__item">Log in</li>
        </Link>
        <Link
          className="navbar__link"
          to={{
            pathname: `/register/step1`,
          }}
        >
          <li className="navbar__item navbar__signup">Sign up</li>{" "}
        </Link>
      </ul>
    </nav>
  );
};

export default NavigationBar;
