import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function ViewPets() {
  const [pets, setPets] = useState([
    {
      petname: "Obi",
      age: 1,
      ownername: "Tim",
      breed: "Cocker Spaniel",
      species: "dog",
    },
  ]);

  useEffect(() => {
    fetchPets();
    return; // cleanup function?

    async function fetchPets() {
      console.log("Fetching pets...");
      const petsData = await fetch(`${serverURL}/pets`);
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
              age={"" + pet.age}
              breed={pet.breed}
              species={pet.species}
              ownername={pet.ownername}
            ></PetCard>
          </div>
        );
      })}
    </>
  );
}
