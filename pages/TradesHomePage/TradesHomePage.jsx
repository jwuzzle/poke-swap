
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import TradeCards from "../../components/CardListings/TradeCards/TradeCards";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const TradesHomePage = () => {

    const token = sessionStorage.getItem("JWTtoken");
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
    console.log(decoded);
  }
  const userId = decoded.id;
  console.log(userId);

  const getTradeURL = `${baseURL}/trades`;

  const [userOffTrades, setUserOffTrades] = useState([]);

  useEffect(() => {
    const getOffTradesByUserId = async () => {
      try {
        const response = await axios.get(
          `${getTradeURL}/offering?userId=${userId}`
        );
        console.log("Response status:", response.status);
        console.log(response.data);
        setUserOffTrades(response.data);
      } catch (error) {
        ("Error while retrieving cards.");
      }
    };
    getOffTradesByUserId();
  }, []);

  console.log(userOffTrades);

  const [userRecTrades, setUserRecTrades] = useState([]);

  useEffect(() => {
    const getRecTradesByUserId = async () => {
      try {
        const response = await axios.get(
          `${getTradeURL}/receiving?userId=${userId}`
        );
        console.log("Response status:", response.status);
        console.log(response.data);
        setUserRecTrades(response.data);
      } catch (error) {
        ("Error while retrieving cards.");
      }
    };
    getRecTradesByUserId();
  }, []);

  console.log(userRecTrades);

  return (
    <div>
<p>Your Trades</p>
{userOffTrades.map((trade, index) => ( 
<TradeCards frontimage={trade.front_image_url}
name={trade.name}
requester_name={trade.username}
receiver_name={trade.username} />))}
<p>Your Trades Requests</p>
<div>
{userRecTrades.length === 0 ? (<p>No open requests</p>) :(
userRecTrades.map((trade, index) => ( <TradeCards frontimage={trade.front_image_url}
    name={trade.name}
    requester_name={trade.username}
    receiver_name={trade.username} />))
)}</div>
    </div>
  )
}

export default TradesHomePage