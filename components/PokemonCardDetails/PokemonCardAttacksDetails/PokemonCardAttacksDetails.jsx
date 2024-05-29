import "./PokemonCardAttacksDetails.scss";

const PokemonCardAttacksDetails = (props) => {

    const attackCostDisplay = Array.isArray(props.attackcost) ? props.attackcost.join(', ') : props.attackcost;

  return (
    <>
      <div className="attacks">
      <p className="attacks__label">Name: <span className="attacks__copy">{props.attackname}</span></p>
      <p className="attacks__copy">{props.attacktext}</p>
      <p className="attacks__label">Cost: <span className="attacks__copy">{attackCostDisplay}</span></p>
      <p className="attacks__label">Coverted Energy Cost: <span className="attacks__copy">{props.attackcovertenergycost}</span></p>
      <p className="attacks__label">Damage: <span className="attacks__copy">{props.attackdamage}</span></p>
    </div></>
  );
};

export default PokemonCardAttacksDetails;
