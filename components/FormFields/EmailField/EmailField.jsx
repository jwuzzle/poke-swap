import "./EmailField.scss";

const EmailField = (props) => {
  return (
    <div className="signup__input">
      <label className="signup__label">{props.label}</label>
      <input type="email" name={props.label_name} />
    </div>
  )
}

export default EmailField