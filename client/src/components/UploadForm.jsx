import { useState } from "react";

export default function UploadForm() {
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    petSpecies: "",
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ownerName">Name of owner</label>
        <input
          type="text"
          name="ownerName"
          id="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="petName">Name of pet</label>
        <input
          type="text"
          name="petName"
          id="petName"
          value={formData.petName}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="petSpecies">Species of pet (eg dog, cat)</label>
        <input
          type="text"
          name="petSpecies"
          id="petSpecies"
          value={formData.petSpecies}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch("http://localhost:8080/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerName: formData.ownerName,
        petName: formData.petName,
        petSpecies: formData.petSpecies,
      }),
    });
  }
}
