import "./PokemonCardCollectionModal.scss";

const PokemonCardCollectionModal = (props) => {
  return (
    <>
        <div
          className={props.className}
          onClick={props.onclick ? props.onclick : undefined}
        >
            <div className="modal-card__cardimage-container">
          <img
            className="modal-card__cardimage"
            src={props.image}
            alt={props.cardname}
          /></div>
          <div className="modal-card__carddata-container">
          <h2 className="modal-card__cardname">{props.cardname}</h2>
          <p className="modal-card__cardset">{props.setname}</p>
          <p className="modal-card__cardcondition">{props.condition}</p>
          </div>
        </div>
    </>
  );
};

export default PokemonCardCollectionModal;
