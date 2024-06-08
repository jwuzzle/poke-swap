import React from "react";
import CollectionModal from "../../components/CollectionModal/CollectionModal";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import "./TradePage.scss";
import TradeArenaCardContainer from "../../components/TradeArenaCardContainer/TradeArenaCardContainer";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const TradePage = () => {
  const navigate = useNavigate();
  const { tradeid } = useParams();
  const getTradeURL = `${baseURL}/trades/${tradeid}`;

  // get trade data

  const [tradeData, setTradeData] = useState([]);
  const getTradeData = async () => {
    try {
      const response = await axios.get(getTradeURL);
      setTradeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTradeData();
  }, [tradeid]);

  console.log(tradeData)

  // get receiver trade data

  const receiverId = tradeData[0] && tradeData[0].receiving_user_id;
  const getReceiverTradeURL = `${baseURL}/trades/receiving/${tradeid}`;
  const [receiverTradeData, setReceiverTradeData] = useState(null);

  const getReceiverTradeData = async () => {
    try {
      const response = await axios.get(
        `${getReceiverTradeURL}/posts?postUserId=${receiverId}`
      );
      setReceiverTradeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tradeData && receiverId) {
      getReceiverTradeData();
    }
  }, [tradeData]);

  //// get offerer's trade data

  const [offererTradeData, setOffererTradeData] = useState(null);
  const getOffererTradeURL = `${baseURL}/trades/offering/${tradeid}`;
  const offererId = tradeData[0] && tradeData[0].offering_user_id;

  const getOffererTradeData = async () => {
    try {
      const response = await axios.get(
        `${getOffererTradeURL}/posts?postUserId=${offererId}`
      );
      setOffererTradeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tradeData && offererId) {
      getOffererTradeData();
    }
  }, [tradeData]);

  const [offererCardIds, setOffererCardIds] = useState([]);
  const [isPickCardsModalOpen, setIsPickCardsModalOpen] = useState(false);
  const [isDeleteCardsModalOpen, setisDeleteCardsModalOpen] = useState(false);
  const [offeringUserId, setOfferingUserId] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteItems, setDeleteItems] = useState([]);

  const addCardsToTrade = async () => {
    try {
      const newCardIds = selectedItems.filter(
        (id) => !offererCardIds.includes(id) //checks to make sure if user_card_id already exists, to not create a dup row
      );
      const response = newCardIds.map((postId) =>
        axios.post(getTradeURL, {
          tradeid: tradeid,
          postid: postId,
        })
      );
      const responses = await Promise.all(response);
      responses.forEach((response) => console.log(response.data));
      setIsPickCardsModalOpen(!isPickCardsModalOpen);
      window.location.reload();
    } catch (error) {
      console.error("Error when adding requester cards to trade", error);
    }
    setIsPickCardsModalOpen(false);
  };

  useEffect(() => {
    if (offererTradeData) {
      const cardIds = offererTradeData.map((data) => data.user_card_id);
      setOffererCardIds(cardIds);
    }
  }, [offererTradeData]);

  const togglePickCardsModal = () => {
    setIsPickCardsModalOpen(!isPickCardsModalOpen);
    setOfferingUserId(tradeData[0].offering_user_id);
    setSelectedItems(offererCardIds);
  };

  const togglePickCardsModalDelete = () => {
    setisDeleteCardsModalOpen(!isDeleteCardsModalOpen);
    setOfferingUserId(tradeData[0].offering_user_id);
    setDeleteItems(deleteItems);
  };

  const removeCardsFromTrade = async (postIds) => {
    try {
      console.log("Post ID to be removed:", postIds);
      console.log("Trade URL:", getTradeURL);
      await axios.delete(getTradeURL, {
        data: {
          postids: postIds,
        },
      });
      setisDeleteCardsModalOpen(!isDeleteCardsModalOpen);
      window.location.reload();
    } catch (error) {
      console.error("Error when removing requester cards from trade", error);
    }
    setisDeleteCardsModalOpen(false);
  };

  const goToTradeReceiverListing = () => {
    navigate(`/collection/${tradeData[0].receiving_user_id}/listing/${tradeData[0].card_post_id}`);
  };

  const goToTradeOffererListing = (user_card_id) => {
    navigate(`/collection/${tradeData[0].offering_user_id}/listing/${user_card_id}`);
  };

  console.log(offererTradeData)

  return (
    <div className="trade-page">
      <h1 className="trade-page__page-header">The Trade Arena</h1>
      <div className="trade-arena">
        <div className="receiver">
          <h2 className="requestor__subheader">THE RECEIVER</h2>
          <h2 className="receiver__name">
            {tradeData.length > 0 && `${tradeData[0].receiving_username}`}
          </h2>
          <p className="receiver__tradevalue">
            Trade Value: <span></span>
          </p>
          <div className="receiver__cards">
            {receiverTradeData &&
              receiverTradeData.map((receive, index) => (
                <PokemonCard
                  key={index}
                  image={receive.front_image_url}
                  cardname={receive.name}
                  setname={receive.set}
                  condition={receive.condition}
                  onclick={() => goToTradeReceiverListing()}
                />
              ))}
          </div>
        </div>
        <div className="trade-arena__center">
          <div className="trade-arena__pokeball"></div>
        </div>
        <div className="requestor">
          {/* <TradeArenaCardContainer data={offererTradeData} onclick={() => goToTradeOffererListing()} /> */}
          <div className="requestor__cards">
          {/* {!offererTradeData ? (<p>No cards added for the trade</p>) : (
              offererTradeData.map((offerer, index) => (
                <PokemonCard
                  key={index}
                  image={offerer.front_image_url}
                  cardname={offerer.name}
                  setname={offerer.set}
                  condition={offerer.condition}
                  onclick={() => goToTradeOffererListing(offerer.user_card_id)}
                />
              )))} */}
            {offererTradeData &&
              offererTradeData.map((offerer, index) => (
                <PokemonCard
                  key={index}
                  image={offerer.front_image_url}
                  cardname={offerer.name}
                  setname={offerer.set}
                  condition={offerer.condition}
                  onclick={() => goToTradeOffererListing(offerer.user_card_id)}
                />
              ))}
          </div>
          <p className="requestor__tradevalue">
            Trade Value: <span></span>
          </p>
          <div className="requestor__information">
            <p className="requestor__collection-header">
              See User B's collection to add to the trade
            </p>
            <button
              className="requestor__collection-button"
              onClick={() => togglePickCardsModal(offeringUserId)}
            >
              Add Cards
            </button>
            <button
              className="requestor__collection-button"
              onClick={() => togglePickCardsModalDelete(offeringUserId)}
            >
              Remove Cards
            </button>
          </div>
          <h2 className="requestor__name">
            {tradeData.length > 0 && `${tradeData[0].offering_username}`}
          </h2>
          <h2 className="requestor__subheader">THE REQUESTOR</h2>
        </div>
      </div>
      <CollectionModal
        isAddOpen={isPickCardsModalOpen}
        offering_user_id={offeringUserId}
        toggleModal={togglePickCardsModal}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        handleAction={addCardsToTrade}
        data={selectedItems}
        tradeid={tradeid}
        title="Add cards to the trade."
        body={
          tradeData.length > 0 &&
          `Select the cards from ${tradeData[0].offering_username}'s collection that should be added to the trade.`
        }
        action="Add to Trade"
      />
      <CollectionModal
        isDeleteOpen={isDeleteCardsModalOpen}
        offering_user_id={offeringUserId}
        toggleModal={togglePickCardsModalDelete}
        selectedItems={deleteItems}
        setDeleteItems={setDeleteItems}
        handleActionDelete={removeCardsFromTrade}
        data={deleteItems}
        tradeid={tradeid}
        title="Remove cards from the trade."
        body={
          tradeData.length > 0 &&
          `Select cards from ${tradeData[0].offering_username}'s collection that should be remove from the trade.`
        }
        action="Remove from Trade"
      />
    </div>
  );
};

export default TradePage;
