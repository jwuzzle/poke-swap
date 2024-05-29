import "./Cards.scss";

const Cards = (props) => {
  return (
    <div className="card">
      <img
        className="card__image"
        src={props.frontimage}
        alt="listed pokemon card picture"
      />
      <div className="card__text-container">
        <p className="card__label">
          Condition: <span className="card__data">{props.condition}</span>
        </p>
        <p className="card__label">
          Status:{" "}
          <span
            className={`card__data ${
              props.status === "AVAILABLE" ? "active" : ""
            }`}
          >
            {props.status}
          </span>
        </p>
        <p className="card__label">
          Owner: <span className="card__data">{props.username}</span>
        </p>
      </div>
    </div>
  );
};

export default Cards;
