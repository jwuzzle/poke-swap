import "./PokemonCardAbilitiesDetails.scss";

const PokemonCardAbilitiesDetails = (props) => {
  return (
    <>
      <div className="abilities">
      <p className="abilities__label">Name: <span className="abilities__copy">{props.abilityname}</span></p>
      <p className="abilities__copy">{props.abilitytext}</p>
      </div>
    </>
  );
};

export default PokemonCardAbilitiesDetails;
