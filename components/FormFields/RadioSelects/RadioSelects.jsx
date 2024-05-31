

const RadioSelects = (props) => {
  return (
    <>
      <input
        type="radio"
        checked={props.check}
        value={props.value}
        onChange={props.onchange}
        name={props.name}
        className="radio"
      />
      <label className="radio-label">{props.label}</label>
    </>
  );
};

export default RadioSelects;
