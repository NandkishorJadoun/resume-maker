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

      <br />

      <ProjectsForm
        formHandler={formHandler}
        formData={formData}
        submitHandler={submitHandler}
        isEditing={isEditing}
        handleCancelEdit={handleCancelEdit}
      />

      <br />

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
      <label>
        Project:
        <input
          type="text"
          name="project"
          onChange={formHandler}
          value={formData.project}
        />
      </label>
      <br />
      <label>
        Start Time:
        <input
          type="month"
          name="startTime"
          onChange={formHandler}
          value={formData.startTime}
        />
      </label>
      <br />
      <label>
        End Time:
        <input
          type="month"
          name="endTime"
          onChange={formHandler}
          value={formData.endTime}
        />
      </label>
      <br />
      <label>
        Stack:
        <input
          type="text"
          name="stack"
          onChange={formHandler}
          value={formData.stack}
        />
      </label>
      <br />
      <label>
        Features:
        <textarea
          name="features"
          onChange={formHandler}
          value={formData.features}
        ></textarea>
      </label>
      <br />
      <button type="submit">{isEditing ? "Save" : "Submit"}</button>

      {isEditing && (
        <button onClick={handleCancelEdit} type="button">
          Cancel
        </button>
      )}
    </form>
  );
}
