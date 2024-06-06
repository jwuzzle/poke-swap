import React from "react";
import CollectionModal from "../../components/CollectionModal/CollectionModal";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import "./TradePage.scss";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const TradePage = () => {
  const { tradeid } = useParams();
  const navigate = useNavigate();
  const getTradeURL = `${baseURL}/trades/${tradeid}`;

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

  const receiverId = tradeData[0] && tradeData[0].receiving_user_id;

  //// get receiver trade data

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

  const [isPickCardsModalOpen, setIsPickCardsModalOpen] = useState(false);
  const [offeringUserId, setOfferingUserId] = useState();

  const togglePickCardsModal = () => {
    setIsPickCardsModalOpen(!isPickCardsModalOpen);
    setOfferingUserId(tradeData[0].offering_user_id);
  };

  const [selectedItems, setSelectedItems] = useState([]);
  console.log(selectedItems);

  const addCardsToTrade = async () => {
    try {
      const response = selectedItems.map((postId) =>
        axios.post(getTradeURL, {
          tradeid: tradeid,
          postid: postId,
        })
      );
      const responses = await Promise.all(response);
      responses.forEach((response) => console.log(response.data));
    } catch (error) {
      console.error("Error when adding requester cards to trade", error);
    }
    setIsPickCardsModalOpen(false);
  };

  //// get offerer's trade data
  const getOffererTradeURL = `${baseURL}/trades/offering/${tradeid}`;
  const [offererTradeData, setOffererTradeData] = useState(null);

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

  console.log(receiverTradeData);

  return (
    <div className="trade-page">
      <h1 className="trade-page__page-header">
        Placeholder Heading For the Page
      </h1>
      <div className="trade-page__trades-arena">
        <div className="trade-page__user--receiver">
          <h2 className="trade-page__subheader">
            {tradeData.length > 0 &&
              `${tradeData[0].receiving_username}'s Cards in the Trade (the receiver)`}
          </h2>
          <p>
            Trade Value: <span>Placeholder for trade value of card(s)</span>
          </p>
          <div className="trade-page__top-list">
            {receiverTradeData &&
              receiverTradeData.map((receive, index) => (
                <PokemonCard
                  key={index}
                  image={receive.front_image_url}
                  cardname={receive.name}
                  setname={receive.setname}
                  condition={receive.condition}
                />
              ))}
          </div>
        </div>
        <div className="trade-page__center">
          <div className="trade-page__pokeball"></div>
        </div>
        <div className="trade-page__user--offerer">
          <h2 className="trade-page__subheader">
            {tradeData.length > 0 &&
              `${tradeData[0].offering_username}'s Cards in the Trade (the requester)`}
          </h2>
          <p>
            Trade Value: <span>Placeholder for trade value of card(s)</span>
          </p>
          <div className="trade-page__bottom-list">
          {offererTradeData &&
            offererTradeData.map((offer, index) => (
              <PokemonCard
                key={index}
                image={offer.front_image_url}
                cardname={offer.name}
                setname={offer.setname}
                condition={offer.condition}
              />
            ))}</div>
          <p>See User B's collection to add to the trade</p>
          <button onClick={() => togglePickCardsModal(offeringUserId)}>
            Show
          </button>
        </div>
      </div>
      <CollectionModal
        isOpen={isPickCardsModalOpen}
        offering_user_id={offeringUserId}
        toggleModal={togglePickCardsModal}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        handleAction={addCardsToTrade}
        data={selectedItems}
        title="Select cards you want for the trade."
        body={
          tradeData.length > 0 &&
          `Select the cards from ${tradeData[0].offering_username}'s collection that you want for the trade.`
        }
        action="Add to Trade"
      />
    </div>
  );
};

export default TradePage;
