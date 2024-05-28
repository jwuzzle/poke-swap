import "./Cards.scss"

const Cards = (props) => {


  return (
    <div className="card">
        <img className="card__image" src={props.frontimage} alt="listed pokemon card picture" />
        <p className="card__condition">Condition: {props.condition}</p>
        <p className="card__status">Status: {props.status}</p>
        <p className="card__owner">Owner: {props.username}</p>
    </div>
  )
}

export default Cards