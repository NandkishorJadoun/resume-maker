export function Preview({ resume }) {
  return (
    <div className="resume">
      <h1 className="resume-name">
        {resume.name.first} {resume.name.last}
      </h1>
      <div className="resume-contact">
        {resume.contact.number && resume.contact.number + " | "}
        {resume.contact.email && resume.contact.email + " | "}
        {resume.contact.linkedIn && resume.contact.linkedIn + " | "}
        {resume.contact.github && resume.contact.github}
      </div>

      {/* education */}

      {resume.education.length > 0 && (
        <div>
          <h2>Education</h2>
          <hr />
          {resume.education.map((entry) => {
            return (
              <div key={entry.id} className="resume-entry">
                <h3>{entry.college}</h3>
                <p className="edu-location">{entry.location}</p>
                <p className="edu-degree">{entry.degree}</p>
                <p className="edu-time">
                  {entry.startTime} {entry.endTime && " - " + entry.endTime}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* experience */}

      {resume.experience.length > 0 && (
        <div>
          <h2>Experience</h2>
          <hr />
          {resume.experience.map((entry) => {
            return (
              <div key={entry.id} className="resume-entry">
                <h3>{entry.profession}</h3>
                <p className="exp-time">
                  {entry.startTime} {entry.endTime && " - " + entry.endTime}
                </p>
                <p className="exp-company">{entry.company}</p>
                <p className="exp-location">{entry.location}</p>

                {entry.responsibilities.length > 0 && (
                  <ul className="resume-list">
                    {entry.responsibilities.map(
                      (responsibility, index) =>
                        responsibility && <li key={index}>{responsibility}</li>
                    )}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* project */}

      {resume.projects.length > 0 && (
        <div>
          <h2>Projects</h2>
          <hr />
          {resume.projects.map((entry) => {
            return (
              <div key={entry.id} className="resume-entry">
                <div className="resume-proj-name">
                  <h3>{entry.project} </h3>
                  <p>|</p>
                  <p className="stack">{entry.stack}</p>
                </div>
                <p className="proj-time">
                  {entry.startTime} {entry.endTime && " - " + entry.endTime}
                </p>

                {entry.features.length > 0 && (
                  <ul className="resume-list">
                    {entry.features.map(
                      (feature, index) =>
                        feature && <li key={index}>{feature}</li>
                    )}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Technical Skills */}

      {Object.values(resume.skills).some(
        (skillCategory) => skillCategory.length > 0
      ) && (
        <div className="resume-skills">
          <h2>Technical Skills</h2>
          <hr />
          {resume.skills.languages.length > 0 && (
            <div>
              <h4>Languages: </h4>
              <p>
                {resume.skills.languages.map((lang, index) => (
                  <span key={lang.id}>
                    {index > 0 ? ", " + lang.name : lang.name}
                  </span>
                ))}
              </p>
            </div>
          )}
          {resume.skills.frameworks.length > 0 && (
            <div>
              <h4>Frameworks: </h4>
              <p>
                {resume.skills.frameworks.map((fw, index) => (
                  <span key={fw.id}>
                    {index > 0 ? ", " + fw.name : fw.name}
                  </span>
                ))}
              </p>
            </div>
          )}
          {resume.skills.tools.length > 0 && (
            <div>
              <h4>Tools: </h4>
              <p>
                {resume.skills.tools.map((tool, index) => (
                  <span key={tool.id}>
                    {index > 0 ? ", " + tool.name : tool.name}
                  </span>
                ))}
              </p>
            </div>
          )}
          {resume.skills.libraries.length > 0 && (
            <div>
              <h4>Libraries: </h4>
              <p>
                {resume.skills.libraries.map((lib, index) => (
                  <span key={lib.id}>
                    {index > 0 ? ", " + lib.name : lib.name}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
