import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <h1>Petbook</h1>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
    </>
  );
}

export default App;
