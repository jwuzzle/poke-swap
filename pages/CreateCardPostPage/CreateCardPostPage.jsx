import "./CreateCardPostPage.scss";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PhotoPreview from "../../components/PhotoPreview/PhotoPreview";
import Condition from "../../components/FormFields/Condition/Condition";
import Quantity from "../../components/FormFields/Quantity/Quantity";

const CreateCardPostPage = () => {
  const { name, id } = useParams();

  /* const pokeDataObjectFromStorage = sessionStorage.getItem("pokedata object");
    const pokeDataObjectParsed = JSON.parse(pokeDataObjectFromStorage);
  
    console.log(pokeDataObjectParsed);
  
    const filteredPokeDataObject = pokeDataObjectParsed.filter(
      (poke) => poke.id === id
    ); */

  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const capitalizedName = capitalizeString(name);

  const [preview, setPreview] = useState();
  const [mediaFile, setMediaFile] = useState();

  const handleMediaChange = (event) => {
    setMediaFile(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const cloud_name= import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET;
  const [image, setImage] = useState();

  const uploadMedia = async () => {
    try {
      const url = `http://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
      console.log(url)
      try {
        const formData = new FormData();
        formData.append("file", mediaFile);
        formData.append("upload_preset", preset_key);
        const response = await axios.post(url, formData);
        return response.data.secure_url;
      } catch (error) {
        return "No file attached";
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* const submitCardPost = () => {

  } */

  const testUpload = async () => {
    const result = await uploadMedia();
    setImage(result);
  };



  return (
    <section>
      <h1>{capitalizedName}</h1>
      {/* <p>{filteredPokeDataObject[0].set.name}</p> */}
      <Condition />
      <Quantity />
      <PhotoUpload update={handleMediaChange} />
      {preview && <PhotoPreview preview={preview} />}
      <button onClick={testUpload}>Submit</button>
      {image && <p>Upload Result: {image}</p>}
    </section>
  );
};

export default CreateCardPostPage;
