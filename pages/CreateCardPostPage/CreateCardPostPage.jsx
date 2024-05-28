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

  const [frontPreview, setFrontPreview] = useState([]);
  const [backPreview, setBackPreview] = useState([]);
  const [mediaFileFront, setMediaFileFront] = useState([]);
  const [mediaFileBack, setMediaFileBack] = useState([]);

  const handleMediaChangeFront = (event) => {
   const file = event.target.files[0]
    setMediaFileFront(file);
    setFrontPreview((prevPreviews) => [...prevPreviews, URL.createObjectURL(file)]);
  };

  const handleMediaChangeBack = (event) => {
    const file = event.target.files[0]
    setMediaFileBack(file);
     setBackPreview((prevPreviews) => [...prevPreviews, URL.createObjectURL(file)]);
   };

  console.log(mediaFileFront)
  console.log(frontPreview)
  console.log(mediaFileBack)
  console.log(backPreview)


  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET;

  const [frontImage, setFrontImage] = useState();
  const [backImage, setBackImage] = useState();

  const uploadMediaFront = async () => {
    try {
      const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
      console.log(url);
      try {
        const formData = new FormData();
        formData.append("file", mediaFileFront); 
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

  const uploadMediaBack = async () => {
    try {
      const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
      console.log(url);
      try {
        const formData = new FormData();
        formData.append("file", mediaFileBack);
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
    const resultFront = await uploadMediaFront();
    const resultBack = await uploadMediaBack();
    setFrontImage(resultFront);
    setBackImage(resultBack);

    try {
      const response = await axios.post(postCardURL, {
        user_id: decoded.id,
        card_id: cardId,
        status: "available",
        condition: event.target.condition.value,
        quantity: quantity,
        front_image_url: resultFront,
        back_image_url: resultBack,
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
      <form onSubmit={testUpload}>
        <Condition />
        <Quantity 
        quantity={quantity}
     update={(event) => setQuantity(event.target.value)}
        />
        <PhotoUpload update={handleMediaChangeFront} />
        <PhotoUpload update={handleMediaChangeBack} />
        {frontPreview && (<PhotoPreview preview={frontPreview} />)}
        {backPreview && (<PhotoPreview preview={backPreview} />)}
        <button>Submit</button>
        {frontImage && <p>Upload Result</p>}
        <img src={frontImage} />
       {backImage !== "No file attached" && (<img src={backImage} />)}
      </form>
    </section>
  );
};

export default CreateCardPostPage;
