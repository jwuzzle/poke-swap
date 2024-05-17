const PokemonCardImage = (props) => {
  return (
    <>
      <div>
        <img src={props.image} alt={props.cardname} />
      </div>
    </>
  );
};

export default PokemonCardImage;
