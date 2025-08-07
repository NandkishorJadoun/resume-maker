import { useState } from "react";

export function Contact({ contact, setContact }) {
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

  const contactJsx = (
    <p>
      Contacts: {contact.number && contact.number + " | "}
      {contact.email && contact.email + " | "}
      {contact.linkedIn && contact.linkedIn + " | "}
      {contact.github && contact.github}
    </p>
  );

  return (
    <>
      <h2>Contact Details: </h2>
      <form onSubmit={submitHandler}>
        <InputContact
          label="Phone Number: "
          name="number"
          value={number}
          handleChange={(e) => handleChange(e, setNumber)}
        />
        <InputContact
          label="Email: "
          name="email"
          value={email}
          handleChange={(e) => handleChange(e, setEmail)}
        />
        <InputContact
          label="LinkedIn: "
          name="linkedIn"
          value={linkedIn}
          handleChange={(e) => handleChange(e, setLinkedIn)}
        />
        <InputContact
          label="Github: "
          name="github"
          value={github}
          handleChange={(e) => handleChange(e, setGithub)}
        />

        <button type="submit">Submit</button>
      </form>
      {(contact.number ||
        contact.email ||
        contact.linkedIn ||
        contact.github) &&
        contactJsx}
    </>
  );
}

function InputContact({ label, text, name, handleChange }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}
