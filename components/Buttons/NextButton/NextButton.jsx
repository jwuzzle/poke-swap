import "./NextButton.scss";

const NextButton = (props) => {
  return (
    <div className="next-button__container">
        <button type="button" onClick={props.onclick} className="next-button">
        {props.button_label}
        </button>
    </div>
  )
}

export default NextButton