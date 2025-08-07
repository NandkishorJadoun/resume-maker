import { useState } from "react";
import { Name } from "./components/Name";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";

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

  const [languages, setLanguages] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const [tools, setTools] = useState([]);
  const [libraries, setLibraries] = useState([]);

  const resumeData = {
    name,
    contact,
    education,
    experience,
    projects,
    skills: { languages, frameworks, tools, libraries },
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
      <Experience experience={experience} setExperience={setExperience} />
      <hr />
      <Projects projects={projects} setProjects={setProjects} />
      <hr />
      <Skills
        languages={languages}
        setLanguages={setLanguages}
        frameworks={frameworks}
        setFrameworks={setFrameworks}
        tools={tools}
        setTools={setTools}
        libraries={libraries}
        setLibraries={setLibraries}
      />
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
