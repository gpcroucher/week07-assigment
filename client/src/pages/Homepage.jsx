import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <p>Welcome to PetBook!</p>
      <Link to="/add">Click here to add your pet</Link>
      <br />
      <Link to="/view">Click here to view other pets</Link>
    </>
  );
}
