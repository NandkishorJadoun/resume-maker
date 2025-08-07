import { useState } from "react";

export function Education({ education, setEducation }) {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    college: "",
    degree: "",
    location: "",
    startTime: "",
    endTime: "",
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
      startTime: "",
      endTime: "",
    });
  }

  function handleEdit(entry) {
    setEditId(entry.id);
    setFormData(entry);
  }

  function handleCancelEdit() {
    setEditId(null);
    setFormData({
      college: "",
      degree: "",
      location: "",
      startTime: "",
      endTime: "",
    });
  }

  function handleDelete(id) {
    // just to check if its the same entry that's currently user editing

    if (id === editId) {
      setFormData({
        college: "",
        degree: "",
        location: "",
        startTime: "",
        endTime: "",
      });
      setEditId(null);
    }

    const updatedEducationList = education.filter((entry) => entry.id !== id);
    setEducation(updatedEducationList);
  }

  return (
    <>
      <h2>Education Details</h2>


      <EducationForm
        formHandler={formHandler}
        formData={formData}
        submitHandler={submitHandler}
        isEditing={isEditing}
        handleCancelEdit={handleCancelEdit}
      />


      {education.length > 0 && <p>Submitted Education:</p>}

      {education.map((educationEntry) => {
        return (
          <div key={educationEntry.id}>
            <p>College: {educationEntry.college}</p>
            <p>Degree: {educationEntry.degree}</p>
            <p>Location: {educationEntry.location}</p>
            <p>Start Time: {educationEntry.startTime}</p>
            <p>End Time: {educationEntry.endTime}</p>
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
        <div>
          <label htmlFor="college">College:</label>
          <input
            type="text"
            onChange={formHandler}
            value={formData.college}
            name="college"
            id="college"
          />
        </div>

        <div>
          <label htmlFor="degree">Degree:</label>
          <input
            type="text"
            name="degree"
            id="degree"
            onChange={formHandler}
            value={formData.degree}
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            id="location"
            onChange={formHandler}
            value={formData.location}
          />
        </div>

        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="month"
            onChange={formHandler}
            name="startTime"
            id="startTime"
            value={formData.startTime}
          />
        </div>

        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="month"
            onChange={formHandler}
            name="endTime"
            id="endTime"
            value={formData.endTime}
          />
        </div>

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
