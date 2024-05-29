import "./PokemonCardLogo.scss";

const PokemonCardLogo = (props) => {
  return (
    <div className="details-logo">
    <img className="details-logo__image" src={props.logo} />
    </div>
  )
}

export default PokemonCardLogo