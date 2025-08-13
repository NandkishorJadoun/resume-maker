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
    <div className="resume-section education-section">
      <h2>Education Details</h2>

      <EducationForm
        formHandler={formHandler}
        formData={formData}
        submitHandler={submitHandler}
        isEditing={isEditing}
        handleCancelEdit={handleCancelEdit}
      />

      {education.length > 0 && <p>Submitted Education:</p>}

      {education.length > 0 && (
        <div className="entry-container">
          {education.map((entry) => {
            return (
              <div key={entry.id} className="entry">
                <p>College: {entry.college}</p>
                <p>Degree: {entry.degree}</p>
                {entry.location && <p>Location: {entry.location}</p>}
                {entry.startTime && (
                  <p>
                    Time: {entry.startTime}
                    {entry.endTime && " \u2013 " + entry.endTime}
                  </p>
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

function EducationForm({
  isEditing,
  submitHandler,
  formData,
  formHandler,
  handleCancelEdit,
}) {
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="college">College:</label>
        <input
          required
          onChange={formHandler}
          value={formData.college}
          name="college"
          id="college"
        />
      </div>

      <div>
        <label htmlFor="degree">Degree:</label>
        <input
          required
          name="degree"
          id="degree"
          onChange={formHandler}
          value={formData.degree}
        />
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <input
          name="location"
          id="location"
          onChange={formHandler}
          value={formData.location}
        />
      </div>

      <div>
        <label htmlFor="startTime">Start Time:</label>
        <input
          onChange={formHandler}
          name="startTime"
          id="startTime"
          value={formData.startTime}
        />
      </div>

      <div>
        <label htmlFor="endTime">End Time:</label>
        <input
          onChange={formHandler}
          name="endTime"
          id="endTime"
          value={formData.endTime}
        />
      </div>

      <div className="btn-container">
        <button type="submit">{isEditing ? "Save" : "Submit"}</button>

        {isEditing && (
          <button onClick={handleCancelEdit} type="button" className="cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
