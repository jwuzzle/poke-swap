

const PokemonCardDetails = (props) => {
  return (
    <>
      <img src={props.logo} />
      <p>Card Name:{props.cardname}</p>
      <p>Set Name: {props.setname}</p>
      <p>Set Release Date: {props.setreleasedate}</p>
      <p>Card Number: {props.cardnumber}</p>
      <div>
        <h1>Links:</h1>
        <p>TCGPlayer:</p>
        <a href={props.tcgplayer}>Link</a>
      </div>
      <div>
        <h1>TCG Card Information:</h1>
        <p>HP: {props.hp}</p>
        <p>Type: {props.type}</p>
        <p>Evolves From: {props.evolve}</p>
        <p>Rules: {props.rules}</p>
        <div>Retreat Cost:</div>
        <p>{props.retrestcost}</p>
      </div>
    </>
  );
};

export default PokemonCardDetails;
