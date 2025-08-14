import { useState } from "react";
import downArrow from "../assets/chevron-down.svg";

export function Contact({ setContact, isActive, onShow }) {
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
    <div className="resume-section contact-section">
      <h2 onClick={onShow}>
        <p>Contact Details</p>
        {!isActive && (
          <button>
            <img src={downArrow} alt="down arrow head" height={28} />
          </button>
        )}
      </h2>
      {isActive && (
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
      )}
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
