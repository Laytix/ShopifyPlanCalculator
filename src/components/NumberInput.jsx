const NumberInput = ({ text, placeholder, handler }) => {
  return (
    <div>
      <p>{text}</p>
      <input
        type="number"
        placeholder={placeholder}
        onChange={handler}
        min={0}
      />
    </div>
  );
};

export default NumberInput;
