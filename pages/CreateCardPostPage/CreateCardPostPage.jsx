import "./CreateCardPostPage.scss";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PhotoPreview from "../../components/PhotoPreview/PhotoPreview";
import Condition from "../../components/FormFields/Condition/Condition";
import Quantity from "../../components/FormFields/Quantity/Quantity";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const CreateCardPostPage = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();

  const getcardsURL = `${baseURL}/cards/${id}`;

  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const capitalizedName = capitalizeString(name);

  const [cardId, setCardId] = useState("");
  useEffect(() => {
    const getCardDbDetails = async () => {
      try {
        const response = await axios.get(getcardsURL);
        console.log("Response status:", response.status);
        console.log(response.data);
        console.log(response.data.card[0].id);
        setCardId(response.data.card[0].id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Error occurred:", error);
        }
      }
    };
    getCardDbDetails();
  }, []);

  const token = sessionStorage.getItem("JWTtoken");
  let decoded = null;
  if (token) {
    decoded=jwtDecode(token);
    console.log(decoded);
  }

  const [preview, setPreview] = useState([]);
  const [mediaFile, setMediaFile] = useState([]);

  const handleMediaChange = (event) => {
    const newFile = event.target.files;
    const updatedMediaFiles = [...mediaFile];

    for (let i=0; i < newFile.length; i++) {
      updatedMediaFiles.push(newFile[i]);
      preview.push(URL.createObjectURL(newFile[i]));
    }

    setMediaFile(updatedMediaFiles); 
  };

  console.log(mediaFile)
  console.log(preview)

  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET;
  const [image, setImage] = useState();

  const uploadMedia = async () => {
    try {
      const url = `http://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
      console.log(url);
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
      console.error("did not send to cloudinary.");
    }
  };

  const postCardURL = `${baseURL}/posts/${cardId}`;
  const [quantity, setQuantity] = useState('');

  const testUpload = async (event) => {
    event.preventDefault();
    const result = await uploadMedia();
    setImage(result);

    try {
      const response = await axios.post(postCardURL, {
        user_id: decoded.id,
        card_id: cardId,
        status: "available",
        condition: event.target.condition.value,
        quantity: quantity,
        image_url: result,
      });
      console.log(response);
      console.log("Response from server after post:", response.data);
    } catch (errror) {
      ("Something went wrong. Please try again."
      );
    }
    /* navigate("/home"); */
  };

  return (
    <section>
      <h1>{capitalizedName}</h1>
      {/* <p>{filteredPokeDataObject[0].set.name}</p> */}
      <form onSubmit={testUpload}>
        <Condition />
        <Quantity 
        quantity={quantity}
     update={(event) => setQuantity(event.target.value)}
        />
        <PhotoUpload update={handleMediaChange} />
        {/* listing photo and preview */}
        {!preview ? "" : <PhotoPreview preview={preview} />}
       {/*  {mediaFile.map((mediaFile) => (
          <p>{mediaFile.name}</p> //trying to create the ability to add multiple uploades in one post 
        ))} */}
        <button>Submit</button>
        {image && <p>Upload Result</p>}
        <img src={image} />
      </form>
    </section>
  );
};

export default CreateCardPostPage;
