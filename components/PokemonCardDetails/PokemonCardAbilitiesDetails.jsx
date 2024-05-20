

const PokemonCardAbilitiesDetails = (props) => {
  return (
    <>
      <div>Abilities:</div>
      <p>Name: {props.abilityname}</p>
      <p>Text: {props.abilitytext}</p>
    </>
  );
};

export default PokemonCardAbilitiesDetails;
