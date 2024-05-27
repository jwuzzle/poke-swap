import "./UserCardCollectionPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const UserCardCollection = () => {
  const token = sessionStorage.getItem("JWTtoken");
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
    console.log(decoded);
  }
  const userId = decoded.id;
  console.log(userId);

  const getcardsURL = `${baseURL}/posts`;
  const getcardsURLbyID = `${baseURL}/posts/?userId=${decoded.id}`;
  console.log(getcardsURLbyID);

  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const getCardsByUserId = async () => {
      try {
        const response = await axios.get(
          `${getcardsURL}/user?userId=${userId}`
        );
        console.log("Response status:", response.status);
        console.log(response.data);
        setUserCards(response.data);
      } catch (error) {
        ("Error while retrieving cards.");
      }
    };
    getCardsByUserId();
  }, []);

  console.log(userCards);

  return (
    <div>
        <h3>My Collection</h3>
      {userCards.map((userCard, index) => (
        <PokemonCard 
        key={index}
        image={userCard.image_url}
        cardname={userCard.name}
        setname={userCard.set}
        />
      ))}
    </div>
  );
};

export default UserCardCollection;
