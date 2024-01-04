const RadioInput = ({
  text,
  name,
  value1,
  label1,
  valuestate,
  handler,
  value2,
  label2,
}) => {
  return (
    <div>
      <p>{text}</p>
      <div>
        <input
          type="radio"
          name={name}
          value={value1}
          onChange={() => handler(value1)}
          checked={valuestate === true}
        />
        <label htmlFor={value1.toString()}>{label1}</label>
      </div>
      <div>
        <input
          type="radio"
          value={value2}
          name={name}
          onChange={() => handler(value2)}
          checked={valuestate === false}
        />
        <label htmlFor={value2.toString()}>{label2}</label>
      </div>
    </div>
  );
};

export default RadioInput;
