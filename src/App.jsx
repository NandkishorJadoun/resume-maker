import { useState } from "react";
import { Name } from "./components/Name";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Preview } from "./components/Preview";
import github from "./assets/github.svg";
import toggle from "./assets/toggle.svg";
import print from "./assets/printer.svg";

import { initData } from "./assets/initData";
import "./styles/styles.css";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [activeIndex, setActiveIndex] = useState(0);

  const [name, setName] = useState(initData.name);
  const [contact, setContact] = useState(initData.contact);
  const [education, setEducation] = useState(initData.education);
  const [experience, setExperience] = useState(initData.experience);
  const [projects, setProjects] = useState(initData.projects);
  const [languages, setLanguages] = useState(initData.skills.languages);
  const [frameworks, setFrameworks] = useState(initData.skills.frameworks);
  const [tools, setTools] = useState(initData.skills.tools);
  const [libraries, setLibraries] = useState(initData.skills.libraries);

  const resume = {
    name,
    contact,
    education,
    experience,
    projects,
    skills: { languages, frameworks, tools, libraries },
  };

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  document.body.setAttribute("data-theme", theme);

  return (
    <>
      <header>
        <h1>Resume Builder</h1>
        <nav>
          <button onClick={toggleTheme}>
            <img src={toggle} alt="toggle" height={32} />
          </button>
          <button
            onClick={() =>
              window.open(
                "https://github.com/NandkishorJadoun/resume-maker",
                "_blank"
              )
            }
          >
            <img src={github} alt="github" height={32} />
          </button>
          <button onClick={() => window.print()}>
            <img src={print} alt="print" height={32} />
          </button>
        </nav>
      </header>

      <main>
        <section className="input-section">
          <Name
            setName={setName}
            isActive={activeIndex === 0}
            onShow={() => setActiveIndex(0)}
          />
          <hr />
          <Contact
            setContact={setContact}
            isActive={activeIndex === 1}
            onShow={() => setActiveIndex(1)}
          />
          <hr />
          <Education
            education={education}
            setEducation={setEducation}
            isActive={activeIndex === 2}
            onShow={() => setActiveIndex(2)}
          />
          <hr />
          <Experience
            experience={experience}
            setExperience={setExperience}
            isActive={activeIndex === 3}
            onShow={() => setActiveIndex(3)}
          />
          <hr />
          <Projects
            projects={projects}
            setProjects={setProjects}
            isActive={activeIndex === 4}
            onShow={() => setActiveIndex(4)}
          />
          <hr />
          <Skills
            isActive={activeIndex === 5}
            onShow={() => setActiveIndex(5)}
            languages={languages}
            setLanguages={setLanguages}
            frameworks={frameworks}
            setFrameworks={setFrameworks}
            tools={tools}
            setTools={setTools}
            libraries={libraries}
            setLibraries={setLibraries}
          />
        </section>

        <section className="preview-section">
          <Preview resume={resume} />
        </section>
      </main>
    </>
  );
}
