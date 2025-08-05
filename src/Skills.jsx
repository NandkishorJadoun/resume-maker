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
  const [toolInput, setToolInput] = useState("");
  const [libInput, setLibInput] = useState("");

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

  function toolInputHandler(e) {
    setToolInput(e.target.value);
  }

  function toolDeleteHandler(id) {
    const updatedToolsList = tools.filter((tool) => tool.id !== id);
    setTools(updatedToolsList);
  }

  function toolSubmitHandler(e) {
    e.preventDefault();
    const name = e.target.tool.value;
    const id = crypto.randomUUID();
    const tool = { name, id };
    setTools([...tools, tool]);
    setToolInput("");
  }

  const toolJsx = tools.map((tool) => {
    return (
      <span key={tool.id}>
        {tool.name}
        <button onClick={() => toolDeleteHandler(tool.id)}>X</button>
      </span>
    );
  });

    function libInputHandler(e) {
    setLibInput(e.target.value);
  }

  function libDeleteHandler(id) {
    const updatedLibsList = libraries.filter((lib) => lib.id !== id);
    setLibraries(updatedLibsList);
  }

  function libSubmitHandler(e) {
    e.preventDefault();
    const name = e.target.library.value;
    const id = crypto.randomUUID();
    const lib = { name, id };
    setLibraries([...libraries, lib]);
    setLibInput("");
  }

  const libJsx = libraries.map((lib) => {
    return (
      <span key={lib.id}>
        {lib.name}
        <button onClick={() => libDeleteHandler(lib.id)}>X</button>
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

      <SkillsForm
        name={"tool"}
        label={"Tools: "}
        input={toolInput}
        inputHandler={toolInputHandler}
        submitHandler={toolSubmitHandler}
      />

      <SkillsForm
        name={"library"}
        label={"Libraries: "}
        input={libInput}
        inputHandler={libInputHandler}
        submitHandler={libSubmitHandler}
      />

      <p>Added Languages: {langJsx}</p>
      <p>Added Frameworks: {frameworkJsx}</p>
      <p>Added Tools: {toolJsx}</p>
      <p>Added Libraries: {libJsx}</p>
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