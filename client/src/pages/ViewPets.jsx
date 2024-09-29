import { useEffect, useState } from "react";
import Header from "../components/Header";
import PetCard from "../components/PetCard";
import "./ViewPets.css";
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function ViewPets() {
  const [pets, setPets] = useState([
    {
      petname: "Obi",
      age: 1,
      ownername: "Tim Smith",
      breed: "Cocker Spaniel",
      species: "dog",
    },
    {
      petname: "Garfield",
      age: 7,
      ownername: "Jon Arbuckle",
      breed: "Persian",
      species: "cat",
    },
  ]);

  useEffect(() => {
    fetchPets();

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
      <Header exclude={["/view"]}></Header>
      <p>Welcome to the pet gallery!</p>
      <div className="pet-gallery">
        {pets.map((pet, index) => {
          return (
            <PetCard
              key={index}
              petname={pet.petname}
              age={"" + pet.age}
              breed={pet.breed}
              species={pet.species}
              ownername={pet.ownername}
            ></PetCard>
          );
        })}
      </div>
    </>
  );
}
