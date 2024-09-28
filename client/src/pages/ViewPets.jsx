import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";

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
      <p>Welcome to the pet gallery!</p>
      {pets.map((pet, index) => {
        console.log("Attempted to map pets");
        return (
          <div key={index}>
            <PetCard
              petname={pet.petname}
              species={pet.species}
              ownername={pet.ownername}
            ></PetCard>
          </div>
        );
      })}
    </>
  );
}
