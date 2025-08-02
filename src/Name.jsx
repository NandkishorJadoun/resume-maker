export function Name({ resumeData, setResumeData }) {
  function handleChange(e) {
    e.target.name === "first"
      ? setResumeData({
          ...resumeData,
          name: { ...resumeData.name, firstName: e.target.value },
        })
      : setResumeData({
          ...resumeData,
          name: { ...resumeData.name, lastName: e.target.value },
        });
  }

  return (
    <>
      <h2>Write your name:</h2>
      <br />
      <InputName
        name={"first"}
        text={resumeData.name.firstName}
        label={"First name: "}
        handleChange={handleChange}
      />
      <br />
      <InputName
        name={"second"}
        text={resumeData.name.lastName}
        label={"Last name: "}
        handleChange={handleChange}
      />

      <p>{resumeData.name.firstName + " " + resumeData.name.lastName}</p>
    </>
  );
}

function InputName({ label, text, name, handleChange }) {
  return (
    <>
      <label>
        {label}
        <input type="text" name={name} value={text} onChange={handleChange} />
      </label>
    </>
  );
}
