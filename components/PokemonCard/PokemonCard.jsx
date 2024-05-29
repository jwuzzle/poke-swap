import './PokemonCard.scss';


const PokemonCard = (props) => {

  return (
    <>
        <div className="pokemon_card">
          <img
            className="pokemon_card__image"
            src={props.image}
            alt={props.cardname}
          />
          <h2 className="pokemon_card__name">{props.cardname}</h2>
          <p className="pokemon_card__set">{props.setname}</p>
        </div>
    </>
  );
};

export default PokemonCard;
