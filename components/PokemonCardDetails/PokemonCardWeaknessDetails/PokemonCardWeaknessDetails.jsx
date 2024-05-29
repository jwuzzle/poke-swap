import "./PokemonCardWeaknessDetails.scss";

const PokemonCardWeaknessDetails = (props) => {
  return (
    <> 
    <div className="weakness">
        <p className="weakness__label">Type: <span className="weakness__copy">{props.weaknesstype}</span></p>
        <p className="weakness__label">Value: <span className="weakness__copy">{props.weaknessvalue}</span></p>
        </div>
        </>
  )
}


export default PokemonCardWeaknessDetails