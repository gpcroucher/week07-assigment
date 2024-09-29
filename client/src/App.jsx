import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PetUpload from "./pages/PetUpload";
import ViewPets from "./pages/ViewPets";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/add" element={<PetUpload />}></Route>
        <Route path="/view" element={<ViewPets />}></Route>
      </Routes>
    </>
  );
}

export default App;
