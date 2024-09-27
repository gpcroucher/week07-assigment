import NavBar from "../components/NavBar";
import UploadForm from "../components/UploadForm";

export default function PetUpload() {
  return (
    <>
      <NavBar exclude={["/add"]} />
      <UploadForm />
    </>
  );
}
