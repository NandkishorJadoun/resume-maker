import { useState } from "react";

export function Experience({ experience, setExperience }) {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    profession: "",
    company: "",
    location: "",
    time: "",
    responsibilities: "",
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
      setExperience(
        experience.map((entry) =>
          entry.id === editId
            ? {
                ...entry,
                ...formData,
                responsibilities: formData.responsibilities.split("\n"),
              }
            : entry
        )
      );
      setEditId(null);
    } else {
      const makeBulletPoints = formData.responsibilities.split("\n");
      const expEntry = {
        ...formData,
        id: crypto.randomUUID(),
        responsibilities: makeBulletPoints,
      };
      setExperience([...experience, expEntry]);
    }
    setFormData({
      profession: "",
      company: "",
      location: "",
      time: "",
      responsibilities: "",
    });
  }

  function handleEdit(entry) {
    setEditId(entry.id);
    const convertBulletPoints = entry.responsibilities.join("\n");
    const updatedEntry = { ...entry, responsibilities: convertBulletPoints };
    setFormData(updatedEntry);
  }

  function handleCancelEdit() {
    setEditId(null);
    setFormData({
      profession: "",
      company: "",
      location: "",
      time: "",
      responsibilities: "",
    });
  }

  function handleDelete(id) {
    if (id === editId) {
      setFormData({
        profession: "",
        company: "",
        location: "",
        time: "",
        responsibilities: "",
      });
      setEditId(null);
    }

    const updatedExperienceList = experience.filter((entry) => entry.id !== id);
    setExperience(updatedExperienceList);
  }

  return (
    <>
      <h2>Experience Details</h2>

      <br />

      <ExperienceForm
        formHandler={formHandler}
        formData={formData}
        submitHandler={submitHandler}
        isEditing={isEditing}
        handleCancelEdit={handleCancelEdit}
      />

      <br />

      <p>Submitted Experience:</p>
      {experience.map((expEntry) => {
        return (
          <div key={expEntry.id}>
            <p>Profession: {expEntry.profession}</p>
            <p>Company: {expEntry.company}</p>
            <p>Location: {expEntry.location}</p>
            <p>Time: {expEntry.time}</p>
            <ul>
              Responsibilities:
              {expEntry.responsibilities.map((point, index) => {
                return <li key={index}>{point}</li>;
              })}
            </ul>
            <p>Id: {expEntry.id}</p>
            <button onClick={() => handleDelete(expEntry.id)}>Delete</button>
            <button onClick={() => handleEdit(expEntry)}>Edit</button>
          </div>
        );
      })}
    </>
  );
}

function ExperienceForm({
  isEditing,
  submitHandler,
  formData,
  formHandler,
  handleCancelEdit,
}) {
  return (
    <form onSubmit={submitHandler}>
      <label>
        Profession:
        <input
          type="text"
          name="profession"
          onChange={formHandler}
          value={formData.profession}
        />
      </label>
      <br />
      <label>
        Company:
        <input
          type="text"
          name="company"
          onChange={formHandler}
          value={formData.company}
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          name="location"
          onChange={formHandler}
          value={formData.location}
        />
      </label>
      <br />
      <label>
        Time:
        <input
          type="text"
          name="time"
          onChange={formHandler}
          value={formData.time}
        />
      </label>
      <br />
      <label>
        Responsibilities:
        <textarea
          name="responsibilities"
          onChange={formHandler}
          value={formData.responsibilities}
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
