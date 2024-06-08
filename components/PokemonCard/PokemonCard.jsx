import "./PokemonCard.scss";

const PokemonCard = (props) => {
  return (
    <>
      <div className="pokemon-card" onClick={props.onclick ? props.onclick : undefined}>
        <div className="pokemon-card__name-container">
        <h2 className="pokemon-card__name-container--name">{props.cardname}</h2>
        </div>
        <img
          className="pokemon-card__image"
          src={props.image}
          alt={props.cardname}
        />
        
        <p className="pokemon-card__set">{props.setname}</p>
        {props.condition && (
          <p className="pokemon-card__condition">{props.condition}</p>
        )}
      </div>
    </>
  );
};

export default PokemonCard;
