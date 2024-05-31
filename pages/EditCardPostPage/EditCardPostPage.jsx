import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Condition from "../../components/FormFields/Condition/Condition";
import RadioSelects from "../../components/FormFields/RadioSelects/RadioSelects";
import Quantity from "../../components/FormFields/Quantity/Quantity";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const EditCardPostPage = () => {
  const navigate = useNavigate();
  const { postid } = useParams();
  console.log(postid);
  const editpostURL = `${baseURL}/posts/${postid}`;

  const [postData, setPostData] = useState(null);
  const [stockStatus, setStockStatus] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("");

  const getPostData = async () => {
    try {
      const response = await axios.get(editpostURL);
      console.log(response.data);
      setPostData(response.data);
      console.log(response.data.quantity);
      setQuantity(response.data.quantity);
      setStockStatus(response.data.status);
      setCondition(response.data.condition);
    } catch (error) {
      console.error(error);
    }
  };

   useEffect(() => {
        getPostData();
      }, []);

  console.log(postData);
  console.log(stockStatus)
  console.log(quantity)
  console.log(condition)


  const radioChangeHandle = (event) => {
    setStockStatus(event.target.value)
  }

  const conditionChangeHandle = (event) => {
    setCondition(event.target.value);
  };
  

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(editpostURL, {
        status: stockStatus,
        condition: condition,
        quantity: quantity,

      });
      alert("Edit Successful");
      navigate(`/collection/${postData.user_id}/listing/${postid}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {postData === null ? (
        <p>"loading...."</p>
      ) : (
        <form onSubmit={onSubmit}>
          <Condition 
          value={condition} onchange={conditionChangeHandle} />
          <Quantity quantity={quantity}  setQuantity={setQuantity} />
          <RadioSelects 
          label="Available"
          value="available"
          name="stockStatus"
          check={stockStatus === "available" ? true : false} 
          onchange={radioChangeHandle}/>
          <RadioSelects 
          label="Unavailable"
          name="stockStatus"
          value="unavailable"
          check={stockStatus === "unavailable" ? true : false}
          onchange={radioChangeHandle}/>
           <button>Submit</button>
        </form>
      )}
    </>
  );
};

export default EditCardPostPage;
