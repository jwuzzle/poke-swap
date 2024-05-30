import "./OtherUsersCardCollectionPage.scss";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const OtherUsersCardCollectionPage = () => {
  const { userid } = useParams();

  const getcardsURL = `${baseURL}/posts`;
  const getcardsURLbyID = `${baseURL}/posts/?userId=${userid}`;
  console.log(getcardsURLbyID);

  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const getCardsByUserId = async () => {
      try {
        const response = await axios.get(
          `${getcardsURL}/user?userId=${userid}`
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
    <div>
      <h3>INSERT USER NAME Collection</h3>
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
          />{" "}
        </Link>
      ))}
    </div>
  );
};

export default OtherUsersCardCollectionPage;
