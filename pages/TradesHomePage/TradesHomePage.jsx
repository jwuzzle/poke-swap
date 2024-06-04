import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import TradeCards from "../../components/CardListings/TradeCards/TradeCards";
import Modal from "../../components/Modal/Modal";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const TradesHomePage = () => {
  const token = sessionStorage.getItem("JWTtoken");
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
  }
  const userId = decoded.id;

  const getTradeURL = `${baseURL}/trades`;
  const navigate = useNavigate();

  const [userOffTrades, setUserOffTrades] = useState([]);
  useEffect(() => {
    const getOffTradesByUserId = async () => {
      try {
        const response = await axios.get(`${getTradeURL}/offering/${userId}`);
        setUserOffTrades(response.data);
      } catch (error) {
        ("Error while retrieving cards.");
      }
    };
    getOffTradesByUserId();
  }, []);

  const [userRecTrades, setUserRecTrades] = useState([]);
  useEffect(() => {
    const getRecTradesByUserId = async () => {
      try {
        const response = await axios.get(`${getTradeURL}/receiving/${userId}`);
        setUserRecTrades(response.data);
      } catch (error) {
        ("Error while retrieving cards.");
      }
    };
    getRecTradesByUserId();
  }, []);

  const [isAcceptTradeRequestModalOpen, setIsAcceptTradeRequestModalOpen] =
    useState(false);
  const [selectedTradeRequest, setSelectedTradeRequest] = useState([]);

  const toggleAcceptTradeRequestModal = (trade) => {
    setIsAcceptTradeRequestModalOpen(!isAcceptTradeRequestModalOpen);
    setSelectedTradeRequest(trade);
  };

  const tradeId = selectedTradeRequest.trade_id;

  const acceptTradeRequest = async () => {
    try {
      await axios.put(`${getTradeURL}/${tradeId}`, {
        status: "in progress",
      });
      console.log("Row updated: in progress");
      navigate(`/trades/${tradeId}`);
    } catch (error) {
      console.error("Error accepting the trade request:", error);
    }
  };

  const declineTradeRequest = async () => {
    try {
      await axios.put(`${getTradeURL}/${tradeId}`, {
        status: "declined",
      });
      console.log("Row updated: declined");
      navigate("/trades");
    } catch (error) {
      console.error("Error accepting the trade request:", error);
    }
  };

  const goToTradePage = (tradeId) => {
    navigate(`/trades/${tradeId}`);
  };

  return (
    <div>
      <p>Your Trades</p>
      {userOffTrades.map((trade, index) => (
        <TradeCards
          key={index}
          frontimage={trade.posts_front_image}
          name={trade.card_name}
          requester_name={trade.users_username}
          receiver_name={trade.users_username}
          status={trade.trade_status}
        />
      ))}
      <p>Your Trades Requests</p>
      <div>
        {userRecTrades.length === 0 ? (
          <p>No open requests</p>
        ) : (
          userRecTrades.map((trade, index) => (
            <TradeCards
              key={index}
              frontimage={trade.posts_front_image}
              name={trade.card_name}
              requester_name={trade.users_username}
              receiver_name={trade.users_username}
              status={trade.trade_status}
              onClick={
                trade.trade_status === "pending"
                  ? () => toggleAcceptTradeRequestModal(trade)
                  : () => goToTradePage(trade.trade_id)
              }
            />
          ))
        )}
      </div>
      <div>
        <Modal
          isOpen={isAcceptTradeRequestModalOpen}
          toggleModal={toggleAcceptTradeRequestModal}
          handleAction={acceptTradeRequest}
          handleAction2={declineTradeRequest}
          action="Accept"
          action2="Decline"
          title={`${selectedTradeRequest.users_username} is requesting a trade`}
          body={`Please confirm that you'd like to start the trade with ${selectedTradeRequest.users_username}.`}
        />
      </div>
    </div>
  );
};

export default TradesHomePage;
