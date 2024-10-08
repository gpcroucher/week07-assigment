import { useState } from "react";
import "./UploadForm.css";
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function UploadForm() {
  const blankData = {
    ownerName: "",
    petName: "",
    petSpecies: "",
    age: "",
    breed: "",
  };
  const [formData, setFormData] = useState(blankData);

  return (
    <>
      <form onSubmit={handleSubmit} className="upload-form">
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
        <label htmlFor="age">Age of pet</label>
        <input
          type="text"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="integers only"
        />
        <br />
        <label htmlFor="breed">Breed of pet</label>
        <input
          type="text"
          name="breed"
          id="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="eg Cocker Spaniel, Siamese"
        />
        <br />
        <label htmlFor="petSpecies">Species of pet</label>
        <input
          type="text"
          name="petSpecies"
          id="petSpecies"
          value={formData.petSpecies}
          onChange={handleChange}
          placeholder="eg dog, cat"
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
    const result = await fetch(`${serverURL}/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerName: formData.ownerName,
        petName: formData.petName,
        petSpecies: formData.petSpecies,
        age: formData.age,
        breed: formData.breed,
      }),
    });
    if (result.status == 200) {
      console.log("Successfully uploaded pet.");
      setFormData(blankData);
    }
    if (result.status == 400) {
      console.log(alert("Please fill in all the fields before submitting."));
    }
  }
}
