import "./CardListings.scss";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cards from "./Cards/Cards";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const CardListings = () => {

  const { id, name } = useParams();

  const getcardsURL = `${baseURL}/cards/${id}`;

  const [cardId, setCardId] = useState("");
  const [cardPosts, setCardPosts] = useState([])

  useEffect(() => {
    const getCardDbDetails = async () => {
      try {
        const response = await axios.get(getcardsURL);
        console.log("Response status:", response.status);
        console.log(response.data);
        console.log(response.data.card[0].id);
        setCardId(response.data.card[0].id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Error occurred:", error);
        }
      }
    };
    getCardDbDetails();
  }, []);

  console.log(cardId)
const getCardPostsURL = `${baseURL}/posts?cardId=${cardId}`

  useEffect(() => {
  const getPostsByCardId = async () => {

    try {
      const response = await axios.get(getCardPostsURL);
      console.log("Response status:", response.status);
        console.log(response.data);
        setCardPosts(response.data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Error occurred:", error);
        }
      }
    };
    getPostsByCardId();
  }, [cardId]);

  console.log(cardPosts)

  /* console.log(cardPosts.cards[0].image_url) */

  const stringifiedPostData = JSON.stringify(cardPosts);
    sessionStorage.setItem('posts object', stringifiedPostData);

  return (
    <section>
      <h3>Trade Listings</h3>
      
      {cardPosts.cards && cardPosts.cards.length > 0 ? (
        cardPosts.cards.map((card, index) => (
         <Link key={index} className="cardpost__link"
          to={{
              pathname: `/search/${card.name.toLowerCase()}/${card.api_card_id}/listing/${card.id}`,
          }} >
          <Cards 
          key={index}
          image={card.image_url}
          condition={card.condition}
          status={card.status.toUpperCase()}
          username={card.username} /></Link>
        ) ) ) : (null) }
    </section>
  );
};



export default CardListings;
