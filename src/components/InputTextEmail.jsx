import "./InputTextEmail.css";
const InputTextEmail = ({
  name,
  domain,
  title,
  placeholder,
  value,
  domainValue,
  onChange,
  error,
  errorDomain,
}) => {
  return (
    <>
      <div className="input_wrap">
        <div className="input_top_box">
          <h4>{title}</h4>
        </div>
        <div className="input_box">
          <input
            type="text"
            name={name}
            id={name}
            placeholder={placeholder}
            className="email"
            value={value}
            onChange={onChange}
            error={error}
          />
          <p className="email_at">@</p>
          <input
            type="text"
            name={domain}
            id={domain}
            className="email"
            value={domainValue}
            onChange={onChange}
            error={errorDomain}
          />
        </div>
      </div>
    </>
  );
};

export default InputTextEmail;
