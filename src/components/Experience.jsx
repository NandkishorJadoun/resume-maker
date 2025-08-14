import { useState } from "react";

export function Experience({ experience, setExperience, isActive, onShow }) {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    profession: "",
    company: "",
    location: "",
    startTime: "",
    endTime: "",
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
      const entry = {
        ...formData,
        id: crypto.randomUUID(),
        responsibilities: makeBulletPoints,
      };
      setExperience([...experience, entry]);
    }
    setFormData({
      profession: "",
      company: "",
      location: "",
      startTime: "",
      endTime: "",
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
      startTime: "",
      endTime: "",

      responsibilities: "",
    });
  }

  function handleDelete(id) {
    if (id === editId) {
      setFormData({
        profession: "",
        company: "",
        location: "",
        startTime: "",
        endTime: "",

        responsibilities: "",
      });
      setEditId(null);
    }

    const updatedExperienceList = experience.filter((entry) => entry.id !== id);
    setExperience(updatedExperienceList);
  }

  return (
    <div className="resume-section experience-section">
      <h2 onClick={onShow}>
        <p>Experience Details</p>
        {!isActive && <button>&#8964;</button>}
      </h2>

      {isActive && (
        <>
          <ExperienceForm
            formHandler={formHandler}
            formData={formData}
            submitHandler={submitHandler}
            isEditing={isEditing}
            handleCancelEdit={handleCancelEdit}
          />

          {experience.length > 0 && <p>Submitted Experience:</p>}

          {experience.length > 0 && (
            <div className="entry-container">
              {experience.map((entry) => {
                return (
                  <div key={entry.id} className="entry">
                    <p>Profession: {entry.profession}</p>
                    <p>Company: {entry.company}</p>
                    {entry.location && <p>Location: {entry.location}</p>}
                    {entry.startTime && (
                      <p>
                        Time: {entry.startTime}
                        {entry.endTime && " \u2013 " + entry.endTime}
                      </p>
                    )}

                    {entry.responsibilities[0] && (
                      <>
                        <p>Responsibilities:</p>
                        <ul>
                          {entry.responsibilities.map((point, index) => {
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
                      <button
                        className="edit"
                        onClick={() => handleEdit(entry)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
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
      <div>
        <label htmlFor="profession">Profession:</label>
        <input
          required
          name="profession"
          id="profession"
          onChange={formHandler}
          value={formData.profession}
        />
      </div>

      <div>
        <label htmlFor="company">Company:</label>
        <input
          required
          name="company"
          id="company"
          onChange={formHandler}
          value={formData.company}
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
        <label htmlFor="responsibilities">Responsibilities:</label>
        <textarea
          name="responsibilities"
          id="responsibilities"
          onChange={formHandler}
          value={formData.responsibilities}
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
