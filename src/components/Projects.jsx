import { useState } from "react";

export function Projects({ projects, setProjects }) {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    project: "",
    startTime: "",
    endTime: "",
    features: "",
    stack: "",
  });

  const isEditing = editId !== null;

  function formHandler(e) {
    const formElementName = e.target.name;
    const formElementValue = e.target.value;
    setFormData({ ...formData, [formElementName]: formElementValue });
  }

  function submitHandler(e) {
    e.preventDefault();
    if (isEditing) {
      setProjects(
        projects.map((project) =>
          project.id === editId
            ? {
                ...project,
                ...formData,
                features: formData.features.split("\n"),
              }
            : project
        )
      );
      setEditId(null);
    } else {
      const makeBulletPoints = formData.features.split("\n");
      const project = {
        ...formData,
        id: crypto.randomUUID(),
        features: makeBulletPoints,
      };
      setProjects([...projects, project]);
    }
    setFormData({
      project: "",
      startTime: "",
      endTime: "",

      features: "",
      stack: "",
    });
  }

  function handleEdit(entry) {
    setEditId(entry.id);
    const convertBulletPoints = entry.features.join("\n");
    const updatedEntry = { ...entry, features: convertBulletPoints };
    setFormData(updatedEntry);
  }

  function handleCancelEdit() {
    setEditId(null);
    setFormData({
      project: "",
      startTime: "",
      endTime: "",
      features: "",
      stack: "",
    });
  }

  function handleDelete(id) {
    if (id === editId) {
      setFormData({
        project: "",
        startTime: "",
        endTime: "",
        features: "",
        stack: "",
      });
      setEditId(null);
    }

    const updatedProjectsList = projects.filter((entry) => entry.id !== id);
    setProjects(updatedProjectsList);
  }

  return (
    <div class="resume-section projects-section">
      <h2>Projects Details</h2>

      <ProjectsForm
        formHandler={formHandler}
        formData={formData}
        submitHandler={submitHandler}
        isEditing={isEditing}
        handleCancelEdit={handleCancelEdit}
      />

      {projects.length > 0 && <p>Submitted Projects:</p>}

      {projects.length > 0 && (
        <div className="entry-container">
          {projects.map((entry) => {
            return (
              <div key={entry.id}>
                <p>Project: {entry.name}</p>
                <p>Stack: {entry.stack}</p>
                {entry.startTime && (
                  <p>
                    Time: {entry.startTime}
                    {entry.endTime && " \u2013 " + entry.endTime}
                  </p>
                )}

                {entry.features[0] && (
                  <>
                    <p>Features:</p>
                    <ul>
                      {entry.features.map((point, index) => {
                        return point.trim() && <li key={index}>{point}</li>;
                      })}
                    </ul>
                  </>
                )}

                <div className="btn-container">
                  <button
                    className="delete"
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
                  </button>
                  <button className="edit" onClick={() => handleEdit(entry)}>
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProjectsForm({
  isEditing,
  submitHandler,
  formData,
  formHandler,
  handleCancelEdit,
}) {
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="project">Project:</label>
        <input
          required
          name="project"
          id="project"
          onChange={formHandler}
          value={formData.project}
        />
      </div>

      <div>
        <label htmlFor="stack">Stack:</label>
        <input
          required
          id="stack"
          name="stack"
          onChange={formHandler}
          value={formData.stack}
        />
      </div>

      <div>
        <label htmlFor="startTime">Start Time:</label>
        <input
          name="startTime"
          id="startTime"
          onChange={formHandler}
          value={formData.startTime}
        />
      </div>

      <div>
        <label htmlFor="endTime">End Time:</label>
        <input
          name="endTime"
          id="endTime"
          onChange={formHandler}
          value={formData.endTime}
        />
      </div>

      <div>
        <label htmlFor="features">Features:</label>
        <textarea
          name="features"
          id="features"
          onChange={formHandler}
          value={formData.features}
        ></textarea>
      </div>

      <div className="btn-container">
        <button type="submit">{isEditing ? "Save" : "Submit"}</button>

        {isEditing && (
          <button className="cancel" onClick={handleCancelEdit} type="button">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
