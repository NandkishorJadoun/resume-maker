import { useState } from "react";
import downArrow from "../assets/chevron-down.svg";

export function Skills({
  languages,
  setLanguages,
  frameworks,
  setFrameworks,
  tools,
  setTools,
  libraries,
  setLibraries,
  isActive,
  onShow,
}) {
  const [langInput, setLangInput] = useState("");
  const [frameworkInput, setFrameworkInput] = useState("");
  const [toolInput, setToolInput] = useState("");
  const [libInput, setLibInput] = useState("");

  function skillInputHandler(e, setSkillInput) {
    setSkillInput(e.target.value);
  }

  function skillDeleteHandler(id, skills, setSkills) {
    const updatedSkillsList = skills.filter((skill) => skill.id !== id);
    setSkills(updatedSkillsList);
  }

  function skillSubmitHandler(
    e,
    skillInputName,
    skills,
    setSkills,
    setSkillInput
  ) {
    e.preventDefault();
    const name = e.target[skillInputName].value;

    // early return if value is empty / just white space

    if (!name.trim()) {
      return;
    }

    const id = crypto.randomUUID();
    const skill = { name, id };
    setSkills([...skills, skill]);
    setSkillInput("");
  }

  function createSkillsJsx(skills, setSkills) {
    return skills.map((skill) => {
      return (
        skill.name.trim() && (
          <span key={skill.id}>
            {skill.name}
            <button
              className="remove"
              onClick={() => skillDeleteHandler(skill.id, skills, setSkills)}
            >
              &#x2715;
            </button>
          </span>
        )
      );
    });
  }

  const langJsx = createSkillsJsx(languages, setLanguages);
  const frameworkJsx = createSkillsJsx(frameworks, setFrameworks);
  const toolJsx = createSkillsJsx(tools, setTools);
  const libJsx = createSkillsJsx(libraries, setLibraries);

  return (
    <div className="resume-section skills-section">
      <h2 onClick={onShow}>
        <p>Skills</p>
        {!isActive && (
          <button>
            <img src={downArrow} alt="down arrow head" height={28} />
          </button>
        )}
      </h2>
      {isActive && (
        <>
          <SkillsForm
            name={"language"}
            label={"Languages: "}
            skillInput={langInput}
            setSkillInput={setLangInput}
            skills={languages}
            setSkills={setLanguages}
            skillInputHandler={skillInputHandler}
            skillSubmitHandler={skillSubmitHandler}
          />

          <SkillsForm
            name={"framework"}
            label={"Frameworks: "}
            skillInput={frameworkInput}
            setSkillInput={setFrameworkInput}
            skills={frameworks}
            setSkills={setFrameworks}
            skillInputHandler={skillInputHandler}
            skillSubmitHandler={skillSubmitHandler}
          />

          <SkillsForm
            name={"tool"}
            label={"Tools: "}
            skillInput={toolInput}
            setSkillInput={setToolInput}
            skills={tools}
            setSkills={setTools}
            skillInputHandler={skillInputHandler}
            skillSubmitHandler={skillSubmitHandler}
          />

          <SkillsForm
            name={"library"}
            label={"Libraries: "}
            skillInput={libInput}
            setSkillInput={setLibInput}
            skills={libraries}
            setSkills={setLibraries}
            skillInputHandler={skillInputHandler}
            skillSubmitHandler={skillSubmitHandler}
          />

          {languages.length > 0 && <div>Added Languages: {langJsx}</div>}
          {frameworks.length > 0 && <div>Added Frameworks: {frameworkJsx}</div>}
          {tools.length > 0 && <div>Added Tools: {toolJsx}</div>}
          {libraries.length > 0 && <div>Added Libraries: {libJsx}</div>}
        </>
      )}
    </div>
  );
}

function SkillsForm({
  name,
  label,
  skillInput,
  setSkillInput,
  skills,
  setSkills,
  skillInputHandler,
  skillSubmitHandler,
}) {
  return (
    <>
      <form
        id="skills-form"
        onSubmit={(e) =>
          skillSubmitHandler(e, name, skills, setSkills, setSkillInput)
        }
      >
        <div>
          <label htmlFor={name}>{label}</label>
          <input
            name={name}
            id={name}
            onChange={(e) => skillInputHandler(e, setSkillInput)}
            value={skillInput}
          />
        </div>

        <button type="submit">+</button>
      </form>
    </>
  );
}
