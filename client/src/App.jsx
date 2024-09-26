import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PetUpload from "./pages/PetUpload";

function App() {
  return (
    <>
      <h1>Petbook</h1>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/add" element={<PetUpload />}></Route>
        {/* <Route path="/view" element={<ViewPets />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
