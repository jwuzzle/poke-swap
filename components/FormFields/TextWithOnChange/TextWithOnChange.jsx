import "./TextWithOnChange.scss";

const TextWithOnChange = (props) => {
  return (
    <div className="text-field">
    <label className="text-field__label" htmlFor={props.label}>{props.label_name}</label>
    <input type="text" id={props.label} name={props.label} value={props.value} onChange={props.onchange} placeholder={props.placeholder} className="text-field__input" />
    </div>
  )
}

export default TextWithOnChange