import "./Password.scss";

const Password = (props) => {
  return (
    <div className="password-field">
    <label className="password-field__label" htmlFor={props.label}>{props.label_name}</label>
    <input type="password" id={props.label} name={props.label} value={props.value} onChange={props.onchange} placeholder={props.placeholder} className="password-field__input" />
    </div>
  )
}

export default Password