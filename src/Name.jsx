import { useState } from "react";

export function Name({ name, setName }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  function submitHandler(e){
    e.preventDefault()
    setName({"first": first, "last": last})
  }


  function handleChange(e, setInputName) {
    const eventValue = e.target.value;
    setInputName(eventValue);
  }

  return (
    <>
      <h2>Write your name:</h2>
      <br />

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

      <p>Full Name: {name.first + " " + name.last}</p>
    </>
  );
}

function InputName({ label, text, name, handleChange }) {
  return (
    <>
      <label>
        {label}
        <input type="text" name={name} value={text} onChange={handleChange} />
      </label>
    </>
  );
}
