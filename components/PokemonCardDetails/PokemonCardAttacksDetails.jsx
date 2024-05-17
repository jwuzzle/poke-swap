const PokemonCardAttacksDetails = (props) => {
  return (
    <>
      <div>Attacks:</div>
      <p>Name: {props.attackname}</p>
      <p>{props.attacktext}</p>
      <p>Cost: {props.attackcost}</p>
      <p>Coverted Energy Cost: {props.attackcovertenergycost}</p>
      <p>Damage: {props.attackdamage}</p>
    </>
  );
};

export default PokemonCardAttacksDetails;
