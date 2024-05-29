import "./PokemonCardImage.scss";

const PokemonCardImage = (props) => {
  return (
    <>
      <div className="details-image">
        <img className="details-image__card" src={props.image} alt={props.cardname} />
      </div>
    </>
  );
};

export default PokemonCardImage;
