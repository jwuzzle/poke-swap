const PokemonCardAttacksDetails = (props) => {

    const attackCostDisplay = Array.isArray(props.attackcost) ? props.attackcost.join(', ') : props.attackcost;

  return (
    <>
      <div>Attacks:</div>
      <p>Name: {props.attackname}</p>
      <p>{props.attacktext}</p>
      <p>Cost: {attackCostDisplay}</p>
      <p>Coverted Energy Cost: {props.attackcovertenergycost}</p>
      <p>Damage: {props.attackdamage}</p>
    </>
  );
};

export default PokemonCardAttacksDetails;
