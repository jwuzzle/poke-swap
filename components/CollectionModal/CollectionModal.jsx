import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import closeIcon from "../../src/assets/icons/close.svg";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const CollectionModal = (props) => {
  const userid = props.offering_user_id;
  const getcardsURL = `${baseURL}/posts`;

  const [collection, setCollection] = useState([]);
  useEffect(() => {
    const getOfferingUserCollection = async () => {
      try {
        const response = await axios.get(
          `${getcardsURL}/user?userId=${userid}`
        );
        setCollection(response.data);
      } catch (error) {
        ("Error while retrieving cards.");
      }
    };
    getOfferingUserCollection();
  }, [userid]);

  const postIdArray = [];
  for (let i = 0; i < collection.length; i++) {
    postIdArray.push(collection[i].id);
  }

  const toggleItem = (postId) => {
    props.setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(postId)
        ? prevSelectedItems.filter((i) => i !== postId)
        : [postId, ...prevSelectedItems]
    );
  };

  return (
    props.isOpen && (
      <div className="modal">
        <div className="overlay">
          <div className="modal-content">
            <div className="closeButton">
              <img
                src={closeIcon}
                alt="close the pop up"
                onClick={props.toggleModal}
              />
            </div>
            <div>
              <h2 className="modal-content__title">{props.title}</h2>
              <p className="modal-content__body">{props.body}</p>
              {props.isOpen &&
                collection.map((collect, index) => (
                  <PokemonCard
                    key={index}
                    image={collect.front_image_url}
                    cardname={collect.name}
                    setname={collect.set}
                    onclick={() => toggleItem(collect.id)}
                  />
                ))}
            </div>
            <div className="buttons">
              <button onClick={props.toggleModal} className="buttons__cancel">
                Cancel
              </button>
              <button onClick={props.handleAction} className="buttons__action">
                {props.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CollectionModal;
