import "./CardPostDetailsPage.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../components/Modal/Modal";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const CardPostDetailsPage = () => {
  const { postid } = useParams();
  const navigate = useNavigate();
  const getPostURL = `${baseURL}/posts/${postid}`;
  const deletePostURL = `${baseURL}/posts/${postid}`;
  const [postData, setPostData] = useState(null);

  const getPostData = async () => {
    try {
      const response = await axios.get(getPostURL);
      console.log(response.data);
      setPostData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, [postid]);


  const token = sessionStorage.getItem("JWTtoken");
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
    console.log(decoded);
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  }

  const deletePost = async () => {
    try {
    await axios.delete(deletePostURL);
    toggleModal();
    alert("Delete Successful");
    navigate("/collection");
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  }

  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const toggleTradeModal = () => {
    setIsTradeModalOpen(!isTradeModalOpen);
  }

  const startTradeURL = `${baseURL}/trades`;
  const startTrade = async () => {
    try {
      const postToTradeAndTradeItemsTableResponse = await axios.post(startTradeURL, {
        offer_user: decoded.id,
        receive_user: postData.user_id,
        status: "pending",
        postid: postData.id
      });
      console.log("Response from server after post:", postToTradeAndTradeItemsTableResponse.data);
    } catch (errror) {
      ("Something went wrong. Please try again."
      );
    }
    /* navigate("/home"); */
  };

  return !postData ? (
    <p>Loading...</p>
  ) : !token ? (
    <div>
      <p>Front:</p>
      <img className="image" src={postData.front_image_url} />
      {postData.back_image_url !== "" && (
        <>
          <p>Back:</p>
          <img className="image" src={postData.back_image_url} />
        </>
      )}
      <p>{postData.condition}</p>
      <p>{postData.status.toUpperCase()}</p>
      <p>
        Quantity availabe: <span>{postData.quantity}</span>
      </p>
      <p>
        Owner: <span>{postData.username}</span>
      </p>
      <div>
        <Link
          className="card__link"
          to={{
            pathname: `/collection/${postData.user_id}`,
          }}
        >
          See {postData.username}'s Collection
        </Link>
      </div>{" "}
      {/* Think about adding the start trade button here and re-route them to login or sign. */}
    </div>
  ) : (
    <div>
      <p>Front:</p>
      <img className="image" src={postData.front_image_url} />
      {postData.back_image_url !== "" && (
        <>
          <p>Back:</p>
          <img className="image" src={postData.back_image_url} />
        </>
      )}
      <p>{postData.condition}</p>
      <p>{postData.status.toUpperCase()}</p>
      <p>
        Quantity availabe: <span>{postData.quantity}</span>
      </p>
      {postData.user_id === decoded.id ? (
        ""
      ) : (
        <p>
          Owner: <span>{postData.username}</span>
        </p>
      )}
      {postData.user_id === decoded.id ? (
        ""
      ) : (
        <div>
          <Link
            className="card__link"
            to={{
              pathname: `/collection/${postData.user_id}`,
            }}
          >
            See {postData.username}'s Collection
          </Link>
        </div>
      )}
      {postData.user_id === decoded.id ? (
        ""
      ) : (
        <div>
          <p>Start a trade with {postData.username}?</p>
          <button onClick={toggleTradeModal}>Yes</button>
        </div>
      )}
      {postData.user_id !== decoded.id ? (
        ""
      ) : (
        <Link
          className="results__card-link"
          to={{
            pathname: `/collection/${postData.user_id}/listing/${postData.id}/edit`,
          }}
        >
          <button>Edit Listing</button>
        </Link>
      )}
      {postData.user_id !== decoded.id ? (
        ""
      ) : (
          <button onClick={toggleDeleteModal}>Delete</button>
      )}
      <div>
        <Modal isOpen={isDeleteModalOpen} toggleModal={toggleDeleteModal} handleAction={deletePost} action="Delete" title="Delete Listing?" body="Please confirm that you'd like to delete your listing. You won't be able to undo this action." />
        <Modal isOpen={isTradeModalOpen} toggleModal={toggleTradeModal} handleAction={startTrade} action="Let's Trade!" title="Confirm Your Trade" body={`Please confirm that you'd like to start this trade request with ${postData.username}. You won't be able to undo this action.`} />
      </div>
    </div>
  );
};

export default CardPostDetailsPage;
