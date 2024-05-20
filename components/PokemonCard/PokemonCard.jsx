import './PokemonCard.scss';


const PokemonCard = (props) => {

  return (
    <>
      <div className="pokemon_card">
        <div className="pokemon_card__front">
          <img
            className="pokemon_card__image"
            src={props.image}
            alt={props.cardname}
          />
        </div>
        <div className="pokemon_card__hover">
          <h2 className="pokemon_card__name">{props.cardname}</h2>
          <p className="pokemon_card__set">{props.setname}</p>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
