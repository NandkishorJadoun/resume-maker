import { useState } from "react";

export function Name({ setName, isActive, onShow }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    setName({ first: first, last: last });
  }

  function handleChange(e, setInputName) {
    const eventValue = e.target.value;
    setInputName(eventValue);
  }

  return (
    <div className="resume-section name-section">
      <h2 onClick={onShow}>
        <p>Name Details</p>
        {!isActive && <button>&#8964;</button>}
      </h2>

      {isActive && (
        <form onSubmit={submitHandler}>
          <InputName
            name={"first"}
            text={first}
            label={"First name: "}
            handleChange={(e) => handleChange(e, setFirst)}
          />
          <InputName
            name={"last"}
            text={last}
            label={"Last name: "}
            handleChange={(e) => handleChange(e, setLast)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

function InputName({ label, text, name, handleChange }) {
  return (
    <div>
      <label htmlFor={name}> {label}</label>
      <input name={name} value={text} onChange={handleChange} id={name} />
    </div>
  );
}
