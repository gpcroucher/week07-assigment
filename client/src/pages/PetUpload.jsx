import Header from "../components/Header";
import UploadForm from "../components/UploadForm";

export default function PetUpload() {
  return (
    <>
      <Header exclude={["/add"]}></Header>
      <UploadForm />
    </>
  );
}
