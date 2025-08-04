export function Education({ education, setEducation }) {
  function submitHandler(e) {
    e.preventDefault();

    const form = e.target;

    const eduEntry = {
      id: crypto.randomUUID(),
      college: form.college.value,
      degree: form.degree.value,
      location: form.location.value,
      time: form.time.value,
    };

    setEducation([...education, eduEntry]);
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
