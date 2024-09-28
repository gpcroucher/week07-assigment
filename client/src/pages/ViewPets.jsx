import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

export default function ViewPets() {
  const [pets, setPets] = useState([
    { petname: "Obi", ownername: "Tim", species: "dog" },
  ]);

  useEffect(() => {
    fetchPets();
    return; // cleanup function?

    async function fetchPets() {
      console.log("Fetching pets...");
      const petsData = await fetch(`http://localhost:8080/pets`);
      const newPets = await petsData.json();
      // return pets;
      setPets(await newPets);
    }
  }, []);

  return (
    <>
      <NavBar exclude={["/view"]} />
      <p>Hello!</p>
      {pets.map((pet, index) => {
        console.log("Attempted to map pets");
        return (
          <div key={index}>
            <p>
              {pet.petname} is a {pet.species} who belongs to {pet.ownername}
            </p>
          </div>
        );
      })}
    </>
  );
}
