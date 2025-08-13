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

import "./styles/styles.css";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState({ first: "Jake", last: "Ryan" });
  const [contact, setContact] = useState({
    number: "123-456-7890",
    email: "jake@su.edu",
    linkedIn: "linkedin.com/in/jake",
    github: "github.com/jake",
  });
  const [education, setEducation] = useState([
    {
      college: "Southwestern University",
      degree: "Bachelor of Arts in Computer Science, Minor in Business",
      location: "Georgetown, TX",
      startTime: "Aug. 2018",
      endTime: "May 2021",
      id: "edu1",
    },
    {
      college: "Blinn College",
      degree: "Associate's in Liberal Arts",
      location: "Bryan, TX",
      startTime: "Aug. 2014",
      endTime: "May 2018",
      id: "edu2",
    },
  ]);
  const [experience, setExperience] = useState([
    {
      profession: "Undergraduate Research Assistant",
      company: "Texas A&M University",
      location: "College Station, TX",
      startTime: "June 2020",
      endTime: "Present",
      responsibilities: [
        "Developed a REST API using FastAPI and PostgreSQL to store data form learning management systems",
        "Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data",
        "Explored ways to visualize GitHub collaboration in a classroom setting",
      ],
      id: "exp1",
    },

    {
      profession: "Information Technology Support Specialist",
      company: "Southwestern University",
      location: "Georgetown, TX",
      startTime: "Sep. 2018",
      endTime: "Present",
      responsibilities: [
        "Communicate with managers to set up campus computers used on campus",
        "Assess and troubleshoot computer problem brought by students, faculty and staff",
        "Maintain upkeep of computers, classroom equipment, and 200 printers across campus",
      ],
      id: "exp2",
    },

    {
      profession: "Artificial Intelligence Research Assistant",
      company: "Southwestern University",
      location: "Georgetown, TX",
      startTime: "May 2019",
      endTime: "July 2019",
      responsibilities: [
        "Explored methods to generate video game dungeons based off of The Legend of Zelda",
        "Developed a game in Java to test the generated dungeons",
        "Contributed 50k+ lines of code to an established codebase via Git",
        "Conducted a human subject study to determine which video game dungeon generation technique is enjoyable",
        "Wrote an 8-page paper and gave multiple presentations on-campus",
        "Presented virtually to the World Conference on Computational Intelligence",
      ],
      id: "exp3",
    },
  ]);
  const [projects, setProjects] = useState([
    {
      project: "Giltytics",
      stack: "Python, Flask, React, PostgreSQL, Docker",
      startTime: "June 2020",
      endTime: "Present",
      features: [
        "Developed a full-stack web application using with Flask serving a REST API with React as the frontend",
        "Implemented GitHub OAuth to get data from user's repositories",
        "Visualized GitHub data to show collaboration",
        "Used Celery and Redis for asynchronous tasks",
      ],
      id: "proj1",
    },
    {
      project: "Simple Paintball",
      stack: "Spigot API, Java, Maven, TravisCI, Git",
      startTime: "May 2018",
      endTime: "May 2020",
      features: [
        "Developed a minecraft server plugin to entertain kids during free time for a previous job",
        "Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review",
        "Implemented continuous delivery using TravisCI to build the plugin upon new a release",
        "Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin",
      ],
      id: "proj2",
    },
  ]);
  const [languages, setLanguages] = useState([
    { name: "Java", id: "Java" },
    { name: "Python", id: "Python" },
    { name: "C/C++", id: "C/C++" },
    { name: "SQL (Postgres)", id: "SQL (Postgres)" },
    { name: "Javascript", id: "Javascript" },
    { name: "HTML/CSS", id: "HTML/CSS" },
    { name: "R", id: "R" },
  ]);
  const [frameworks, setFrameworks] = useState([
    { name: "Next.js", id: "Next.js" },
    { name: "Node.js", id: "Node.js" },
    { name: "Flask", id: "Flask" },
    { name: "JUnit", id: "JUnit" },
    { name: "WordPress", id: "WordPress" },
    { name: "Material-UI", id: "Material-UI" },
    { name: "FastAPI", id: "FastAPI" },
  ]);
  const [tools, setTools] = useState([
    { name: "Git", id: "Git" },
    { name: "Docker", id: "Docker" },
    { name: "TravisCI", id: "TravisCI" },
    { name: "Google Cloud Platform", id: "Google Cloud Platform" },
    { name: "VS Code", id: "VS Code" },
    { name: "Visual Studio", id: "Visual Studio" },
  ]);
  const [libraries, setLibraries] = useState([
    { name: "React", id: "React" },
    { name: "pandas", id: "pandas" },
    { name: "NumPy", id: "NumPy" },
    { name: "Matplotlib", id: "Matplotlib" },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

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
          <button>
            <img src={github} alt="github" height={32} />
          </button>
          <button>
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
          <Education education={education} setEducation={setEducation} isActive={activeIndex === 2}
            onShow={() => setActiveIndex(2)}/>
          <hr />
          <Experience experience={experience} setExperience={setExperience} isActive={activeIndex === 3}
            onShow={() => setActiveIndex(3)}/>
          <hr />
          <Projects projects={projects} setProjects={setProjects} isActive={activeIndex === 4}
            onShow={() => setActiveIndex(4)}/>
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
