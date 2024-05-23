import "./ListingButton.scss";
import { Link } from "react-router-dom";

const ListingButton = (props) => {

  return (
    <Link to={props.destination}>
      <div className="listing-button__container">
        <button type={props.type} className="listing-button">
          {props.button_label}
        </button>
      </div>
    </Link>
  );
};

export default ListingButton;
