import { useState } from "react";
import { Name } from "./Name";
import { Contact } from "./Contact";
import { Education } from "./Education";

function App() {

  const [name, setName] = useState({ first: "", last: "" });
  const [contact, setContact] = useState({
    number: "",
    email: "",
    linkedIn: "",
    github: "",
  });
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState({
    languages: [],
    frameworks: [],
    tools: [],
    libraries: [],
  });

  const resumeData = {
    name,
    contact,
    education,
    experience,
    projects,
    skills,
  };

  return (
    <>
      <h1>Resume</h1>
      <hr />
      <Name name={name} setName={setName} />
      <hr />
      <Contact contact={contact} setContact={setContact} />
      <hr />
      <Education education={education} setEducation={setEducation} />
      <hr />
      <Preview resumeData={resumeData} />
    </>
  );
}

export default App;

function Preview({ resumeData }) {
  // TODO: Make it like Jake's Resume
  return <div>{JSON.stringify(resumeData)}</div>;
}
