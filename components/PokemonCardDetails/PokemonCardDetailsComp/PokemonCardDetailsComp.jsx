import "./PokemonCardDetailsComp.scss";

const PokemonCardDetails = (props) => {
  return (
    <>
      <div className="details-card">
        <p className="details-card__label">
          Card Name:{" "}
          <span className="details-card__copy">{props.cardname}</span>
        </p>
        <p className="details-card__label">
          Set Name: <span className="details-card__copy">{props.setname}</span>
        </p>
        <p className="details-card__label">
          Set Release Date:{" "}
          <span className="details-card__copy">{props.setreleasedate}</span>
        </p>
        <p className="details-card__label">
          Card Number:{" "}
          <span className="details-card__copy">{props.cardnumber}</span>
        </p>
        <p className="details-card__label">
          Rarity: <span className="details-card__copy">{props.rarity}</span>
        </p>
      </div>
      <div className="details-links">
        <h1 className="details-links__header">Third-Party Resources:</h1>
        <div className="details-links__container">
          <p className="details-links__subheader">
            TCGPlayer:{" "}
            <span>
              <a className="details-links__link" href={props.tcgplayer}>
                View on TCGPlayer
              </a>
            </span>
          </p>
        </div>
      </div>
      <div className="details-play">
        <h1 className="details-play__header">TCG Card Information:</h1>
        <div className="details-play__container">
          <p className="details-card__label">
            HP: <span className="details-card__copy">{props.hp}</span>
          </p>
          <p className="details-card__label">
            Type: <span className="details-card__copy">{props.type}</span>
          </p>
          <p className="details-card__label">
            Evolves From:{" "}
            <span className="details-card__copy">{props.evolve}</span>
          </p>
          <p className="details-card__label">
            Rules: <span className="details-card__copy">{props.rules}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PokemonCardDetails;
