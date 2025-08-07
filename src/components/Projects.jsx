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
    <>
      <h2>Projects Details</h2>

      <ProjectsForm
        formHandler={formHandler}
        formData={formData}
        submitHandler={submitHandler}
        isEditing={isEditing}
        handleCancelEdit={handleCancelEdit}
      />

      {projects.length > 0 && <p>Submitted Projects:</p>}

      {projects.map((project) => {
        return (
          <div key={project.id}>
            <p>Project: {project.name}</p>
            <p>Start Time: {project.startTime}</p>
            <p>End Time: {project.endTime}</p>
            <p>Stack: {project.stack}</p>
            <ul>
              Features:
              {project.features.map((feature, index) => {
                return feature.trim() && <li key={index}>{feature}</li>;
              })}
            </ul>
            <p>Id: {project.id}</p>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
            <button onClick={() => handleEdit(project)}>Edit</button>
          </div>
        );
      })}
    </>
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

      <button type="submit">{isEditing ? "Save" : "Submit"}</button>

      {isEditing && (
        <button onClick={handleCancelEdit} type="button">
          Cancel
        </button>
      )}
    </form>
  );
}
