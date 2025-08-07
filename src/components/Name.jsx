import { useState } from "react";

export function Name({ name, setName }) {
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

  const fullNameJsx = <p>Full Name: {name.first + " " + name.last}</p>;

  return (
    <>
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
      {(name.first || name.last) && fullNameJsx}
    </>
  );
}

function InputName({ label, text, name, handleChange }) {
  return (
    <div>
      <label htmlFor={name}> {label}</label>
      <input
        name={name}
        value={text}
        onChange={handleChange}
        id={name}
      />
    </div>
  );
}
