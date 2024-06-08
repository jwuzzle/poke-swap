import { useState, useEffect } from "react";
import "./CollectionModal.scss";
import axios from "axios";
import closeIcon from "../../src/assets/icons/close.svg";
import PokemonCardCollectionModal from "../PokemonCard/PokemonCardCollectionModal";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const CollectionModal = (props) => {
  const userid = props.offering_user_id;
  const getOffererPostsURL = `${baseURL}/posts`;

  const [collection, setCollection] = useState([]);
  useEffect(
    () => {
      /* if (!props.isDeleteOpen) { */
      const getOfferingUserCollection = async () => {
        try {
          const response = await axios.get(
            `${getOffererPostsURL}/user?userId=${userid}`
          );
          console.log("Collection axios fired");
          setCollection(response.data);
        } catch (error) {
          ("Error while retrieving cards available to trade by the offering user.");
        }
      };
      getOfferingUserCollection();
    } /* } */,
    [userid]
  );

  const toggleItem = (postId) => {
    props.setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(postId)
        ? prevSelectedItems.filter((i) => i !== postId)
        : [postId, ...prevSelectedItems]
    );
  };
  const selectedItems = new Set(props.data);

  const tradeid = props.tradeid;
  const [offererCardsInTrade, setOffererCardsInTrade] = useState([]);
  const getOffererSelectedTradePostsURL = `${baseURL}/trades/offering/${tradeid}`;

  useEffect(
    () => {
      /*  if (!props.isAddOpen) { */
      const getOfferingSelectedTradePosts = async () => {
        try {
          const response = await axios.get(
            `${getOffererSelectedTradePostsURL}/posts?postUserId=${userid}`
          );
          console.log("Offerer posts already selected axios fired");
          setOffererCardsInTrade(response.data);
        } catch (error) {
          ("Error while retrieving cards already in trade.");
        }
      };
      getOfferingSelectedTradePosts();
    } /* } */,
    [userid]
  );

  const toggleItemDelete = (postId) => {
    props.setDeleteItems((prevDeleteItems) =>
      prevDeleteItems.includes(postId)
        ? prevDeleteItems.filter((i) => i !== postId)
        : [postId, ...prevDeleteItems]
    );
  };
  const deleteItems = Array.from(props.data);

  return props.isAddOpen ? (
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
              {props.isAddOpen &&
                collection.map((collect, index) => (
                  <PokemonCardCollectionModal
                    key={index}
                    image={collect.front_image_url}
                    cardname={collect.name}
                    setname={collect.set}
                    condition={collect.condition}
                    onclick={() => {
                      toggleItem(collect.id);
                    }}
                    className={`modal-card ${
                      selectedItems.has(collect.id) ? `selected` : ""
                    }`}
                  />
                ))}
            </div>
          </div>
          <div className="collection-modal__buttons">
            <button
              onClick={props.toggleModal}
              className="collection-modal__buttons--cancel"
            >
              Cancel
            </button>
            <button
              onClick={props.handleAction}
              className="collection-modal__buttons--action"
            >
              {props.action}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    props.isDeleteOpen && (
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
                {props.isDeleteOpen &&
                  offererCardsInTrade.map((collect, index) => (
                    <PokemonCardCollectionModal
                      key={index}
                      image={collect.front_image_url}
                      cardname={collect.name}
                      setname={collect.set}
                      condition={collect.condition}
                      onclick={() => {
                        toggleItemDelete(collect.user_card_id);
                      }}
                      className={`modal-card ${
                        deleteItems.includes(collect.user_card_id)
                          ? `selected`
                          : ""
                      }`}
                    />
                  ))}
              </div>
            </div>
            <div className="collection-modal__buttons">
              <button
                onClick={props.toggleModal}
                className="collection-modal__buttons--cancel"
              >
                Cancel
              </button>
              <button
                onClick={() => props.handleActionDelete(deleteItems)}
                className="collection-modal__buttons--action"
              >
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
