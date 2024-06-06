import { useState, useEffect } from "react";
import "./CollectionModal.scss";
import axios from "axios";
import closeIcon from "../../src/assets/icons/close.svg";
import PokemonCardCollectionModal from "../PokemonCard/PokemonCardCollectionModal";

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

  console.log(collection)
  console.log(props.data)

  const selectedItems = new Set(props.data);
  console.log(selectedItems)

  return (
    props.isOpen && (
      <div className="collection-modal">
        <div className="collection-modal__overlay">
          <div className="collection-modal__modal-content">
            <div className="collection-modal__closeButton">
              <img
                src={closeIcon}
                alt="close the pop up"
                onClick={props.toggleModal}
              />
            </div>
            <div>
              <h2 className="collection-modal__title">{props.title}</h2>
              <p className="collection-modal__body">{props.body}</p>
              <div className="collection-modal__cardlist">
              {props.isOpen &&
                collection.map((collect, index) => (
                  <PokemonCardCollectionModal
                    key={index}
                    image={collect.front_image_url}
                    cardname={collect.name}
                    setname={collect.set}
                    condition={collect.condition}
                    onclick={() => toggleItem(collect.id)}
                    className={`modal-card ${selectedItems.has(collect.id) ? `selected` : ""}`}
                  />
                ))}
                </div>
            </div>
            <div className="collection-modal__buttons">
              <button onClick={props.toggleModal} className="collection-modal__buttons--cancel">
                Cancel
              </button>
              <button onClick={props.handleAction} className="collection-modal__buttons--action">
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
