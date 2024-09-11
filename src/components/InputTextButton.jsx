import "./InputTextButton.css";
const InputTextButton = ({
  name,
  title,
  type,
  placeholder,
  btnName,
  value,
  onChange,
  error,
  useridCheck,
}) => {
  /**
   * btnName의 값 여부에따라 버튼 출력
   */
  const handleButtonDisplay = () => {
    // btnName의 값이 없으면 출력x
    if (!btnName) {
      return;
    }

    return (
      <button className="button" onClick={onClickUseridCheck}>
        {btnName}
      </button>
    );
  };

  const handleErrorDisplay = () => {
    // error내용이없으면 출력x
    if (!error) {
      return;
    }

    return <p>{error}</p>;
  };

  const onClickUseridCheck = () => {
    useridCheck();
  };

  return (
    <>
      <div className="input_wrap">
        <div className="input_top_box">
          <h4>{title}</h4>
          {handleErrorDisplay()}
        </div>
        <div className="input_box">
          <input
            type={type === "password" ? "password" : "text"}
            className="input"
            name={name}
            id={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
          {handleButtonDisplay()}
        </div>
      </div>
    </>
  );
};

export default InputTextButton;
