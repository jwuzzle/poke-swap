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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
          <button>Yes</button>
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
          <button onClick={toggleModal}>Delete</button>
      )}
      <div>
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} handleDelete={deletePost} />
      </div>
    </div>
  );
};

export default CardPostDetailsPage;
