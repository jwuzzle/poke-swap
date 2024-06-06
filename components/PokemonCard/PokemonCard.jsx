import "./PokemonCard.scss";

const PokemonCard = (props) => {
  return (
    <>
      <div className="pokemon-card" onClick={props.onclick ? props.onclick : undefined}>
        <img
          className="pokemon-card__image"
          src={props.image}
          alt={props.cardname}
        />
        <h2 className="pokemon-card__name">{props.cardname}</h2>
        <p className="pokemon-card__set">{props.setname}</p>
        {props.condition && (
          <p className="pokemon-card__condition">Card condition: <span>{props.condition}</span></p>
        )}
      </div>
    </>
  );
};

export default PokemonCard;
