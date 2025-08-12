import { useState } from "react";

export function Name({ setName }) {
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
    <div class="resume-section name-section">
      <h2>Write your name:</h2>
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
