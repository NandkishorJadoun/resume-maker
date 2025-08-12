import { useState } from "react";

export function Contact({ setContact }) {
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");

  function handleChange(e, setInputContact) {
    const eventValue = e.target.value;
    setInputContact(eventValue);
  }

  function submitHandler(e) {
    e.preventDefault();
    setContact({
      number: number,
      email: email,
      linkedIn: linkedIn,
      github: github,
    });
  }

  return (
    <div class="resume-section contact-section">
      <h2>Contact Details: </h2>
      <form onSubmit={submitHandler}>
        <InputContact
          label="Phone Number: "
          name="number"
          type="number"
          value={number}
          handleChange={(e) => handleChange(e, setNumber)}
        />
        <InputContact
          label="Email: "
          name="email"
          type="email"
          value={email}
          handleChange={(e) => handleChange(e, setEmail)}
        />
        <InputContact
          label="LinkedIn: "
          name="linkedIn"
          type="url"
          value={linkedIn}
          handleChange={(e) => handleChange(e, setLinkedIn)}
        />
        <InputContact
          label="Github: "
          name="github"
          type="url"
          value={github}
          handleChange={(e) => handleChange(e, setGithub)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function InputContact({ type, label, text, name, handleChange }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}
