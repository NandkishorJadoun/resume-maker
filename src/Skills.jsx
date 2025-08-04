import { useState } from "react";

export function Skills({
  languages,
  setLanguages,
  frameworks,
  setFrameworks,
  tools,
  setTools,
  libraries,
  setLibraries,
}) {
  const [langInput, setLangInput] = useState("");
  const [frameworkInput, setFrameworkInput] = useState("");

  function langInputHandler(e) {
    setLangInput(e.target.value);
  }

  function langDeleteHandler(id) {
    const updatedLanguagesList = languages.filter((lang) => lang.id !== id);
    setLanguages(updatedLanguagesList);
  }

  function langSubmitHandler(e) {
    e.preventDefault();
    const name = e.target.language.value;
    const id = crypto.randomUUID();
    const lang = { name, id };
    setLanguages([...languages, lang]);
    setLangInput("");
  }

  const langJsx = languages.map((lang) => {
    return (
      <span key={lang.id}>
        {lang.name}
        <button onClick={() => langDeleteHandler(lang.id)}>X</button>
      </span>
    );
  });

  function frameworkInputHandler(e) {
    setFrameworkInput(e.target.value);
  }

  function frameworkDeleteHandler(id) {
    const updatedFrameworksList = frameworks.filter(
      (framework) => framework.id !== id
    );
    setFrameworks(updatedFrameworksList);
  }

  function frameworkSubmitHandler(e) {
    e.preventDefault();
    const name = e.target.framework.value;
    const id = crypto.randomUUID();
    const framework = { name, id };
    setFrameworks([...frameworks, framework]);
    setFrameworkInput("");
  }

  const frameworkJsx = frameworks.map((framework) => {
    return (
      <span key={framework.id}>
        {framework.name}
        <button onClick={() => frameworkDeleteHandler(framework.id)}>X</button>
      </span>
    );
  });

  return (
    <>
      <h2>Skills</h2>
      <SkillsForm
        name={"language"}
        label={"Languages: "}
        input={langInput}
        inputHandler={langInputHandler}
        submitHandler={langSubmitHandler}
      />

      <SkillsForm
        name={"framework"}
        label={"Frameworks: "}
        input={frameworkInput}
        inputHandler={frameworkInputHandler}
        submitHandler={frameworkSubmitHandler}
      />

      <p>Added Languages: {langJsx}</p>
      <p>Added Frameworks: {frameworkJsx}</p>
    </>
  );
}

function SkillsForm({ label, name, input, inputHandler, submitHandler }) {
  return (
    <>
      <form onSubmit={submitHandler}>
        <label>
          {label}
          <input
            type="text"
            name={name}
            onChange={inputHandler}
            value={input}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
