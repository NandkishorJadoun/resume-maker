import { useState } from "react";

export function Education({ education, setEducation }) {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    college: "",
    degree: "",
    location: "",
    time: "",
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
      setEducation(
        education.map((entry) =>
          entry.id === editId ? { ...entry, ...formData } : entry
        )
      );
      setEditId(null);
    } else {
      const eduEntry = {
        id: crypto.randomUUID(),
        ...formData,
      };
      setEducation([...education, eduEntry]);
    }

    setFormData({
      college: "",
      degree: "",
      location: "",
      time: "",
    });
  }

  function handleEdit(entry) {
    setEditId(entry.id);
    setFormData(entry);
  }

  function handleCancelEdit() {
    setEditId(null);
    setFormData({ college: "", degree: "", location: "", time: "" });
  }

  function handleDelete(id) {
    console.log(id, editId);

    // just to check if its the same entry that's currently user editing

    if (id === editId) {
      setFormData({
        college: "",
        degree: "",
        location: "",
        time: "",
      });
      setEditId(null);
    }

    const updatedEducationList = education.filter((entry) => entry.id !== id);
    setEducation(updatedEducationList);
  }

  return (
    <>
      <h2>Education Details</h2>

      <br />

      <EducationForm
        formHandler={formHandler}
        formData={formData}
        submitHandler={submitHandler}
        isEditing={isEditing}
        handleCancelEdit={handleCancelEdit}
      />

      <br />

      <p>Submitted Education:</p>

      <br />

      {education.map((educationEntry) => {
        return (
          <div key={educationEntry.id}>
            <p>College: {educationEntry.college}</p>
            <p>Degree: {educationEntry.degree}</p>
            <p>Location: {educationEntry.location}</p>
            <p>Time: {educationEntry.time}</p>
            <p>Id: {educationEntry.id}</p>
            <button onClick={() => handleDelete(educationEntry.id)}>
              Delete
            </button>
            <button onClick={() => handleEdit(educationEntry)}>Edit</button>
          </div>
        );
      })}
    </>
  );
}

function EducationForm({
  isEditing,
  submitHandler,
  formData,
  formHandler,
  handleCancelEdit,
}) {
  return (
    <>
      <form onSubmit={submitHandler}>
        <label>
          College:
          <input
            type="text"
            onChange={formHandler}
            value={formData.college}
            name="college"
          />
        </label>

        <label>
          Degree:
          <input
            type="text"
            onChange={formHandler}
            value={formData.degree}
            name="degree"
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            onChange={formHandler}
            value={formData.location}
          />
        </label>

        <label>
          Time:
          <input
            type="text"
            onChange={formHandler}
            name="time"
            value={formData.time}
          />
        </label>

        <button type="submit">{isEditing ? "Save" : "Submit"}</button>

        {isEditing && (
          <button onClick={handleCancelEdit} type="button">
            Cancel
          </button>
        )}
      </form>
    </>
  );
}