export function Education({ education, setEducation }) {
  
  function submitHandler(e) {
    e.preventDefault();
    const educationInfo = { id: crypto.randomUUID() };

    for (let i = 0; i < 4; i++) {
      educationInfo[e.target.elements[i].name] = e.target.elements[i].value;
    }
    setEducation([...education, educationInfo]);
  }

  function handleDelete(id) {
    const updatedEducationList = education.filter((entry) => entry.id !== id);
    setEducation(updatedEducationList);
  }

  return (
    <>
      <h2>Education Details: </h2>
      <br />
      <EducationForm submitHandler={submitHandler} />
      <br />
      <p>Submitted Education:</p>
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
            <button>Edit</button>
          </div>
        );
      })}
    </>
  );
}

function EducationForm({ submitHandler }) {
  return (
    <>
      <form onSubmit={submitHandler}>
        <label>
          College:
          <input type="text" name="college" />
        </label>
        <label>
          Degree:
          <input type="text" name="degree" />
        </label>
        <label>
          Location:
          <input type="text" name="location" />
        </label>
        <label>
          Time:
          <input type="text" name="time" />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
