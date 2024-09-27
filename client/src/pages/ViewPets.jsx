import { useEffect } from "react";
import NavBar from "../components/NavBar";

export default function ViewPets() {
  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <>
      <NavBar exclude={["/view"]} />
      <p>Hello!</p>
      {/* pets here */}
    </>
  );

  async function fetchPets() {
    const petsData = await fetch(`http://localhost:8080/pets`);
    const pets = await petsData.json();
    return pets;
  }
}
