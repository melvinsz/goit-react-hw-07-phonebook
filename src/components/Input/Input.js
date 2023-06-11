const Input = ({ children, ...other }) => {
  const {
    label,
    onChange,
    value,
    type,
    name,
    pattern,
    title,
    required = false,
  } = other;

  return (
    <p>
      <label>
        <span>{label}</span>
        <input
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          pattern={pattern}
          title={title}
          required={required}
        />
        {children}
      </label>
    </p>
  );
};

export default Input;
