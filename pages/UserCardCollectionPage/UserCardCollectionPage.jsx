import "./UserCardCollectionPage.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const dataObject = { cards: userCards };
  const stringifiedPokeData = JSON.stringify(dataObject);
  sessionStorage.setItem("posts object", stringifiedPokeData);

  return (
    (userId === null ? (<p>Loading...</p>) : (
    <div className="collection">
      <h3 className="collection__header">My Collection</h3>
      <div className="collection__container">
        {userCards.map((userCard, index) => (
          <Link
          key={index}
            className="results__card-link"
            to={{
              pathname: `/collection/${userCard.user_id}/listing/${userCard.id}`,
            }}
          >
            <PokemonCard
              key={index}
              image={userCard.front_image_url}
              cardname={userCard.name}
              setname={userCard.set}
            />
          </Link>
        ))}
      </div>
    </div>) )
  );
};

export default UserCardCollection;
