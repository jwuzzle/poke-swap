import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import PokeballLoader from "../../components/PokeballLoader/PokeballLoader";
import "./SearchResults.scss";

const SearchResults = () => {
  let { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    const fetchPokeData = async () => {
      try {
        console.log("Name:", name);
        const response = await axios.get(`http://localhost:9080/?name=${name}`);
        console.log(response.data.data);
        setPokeData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPokeData();
  }, [name]);

  const stringifiedPokeData = JSON.stringify(pokeData);
  sessionStorage.setItem("pokedata object", stringifiedPokeData);

  return (
    <>
      {loading ? (
        <div>
            <PokeballLoader />
          </div>
      ) : (
        <div className="results-header">
          <h2 className="results-header__title">
            {name.toUpperCase()} Pokemon Cards
          </h2>
        </div>
      )}

      {loading ? (
        ""
      ) : (
        <div className="results">
          {pokeData.map((card, index) => (
            <div className="results__item" key={index}>
              <Link
                className="results__card-link"
                to={{
                  pathname: `/search/${card.name.toLowerCase()}/${card.id}`,
                }}
              >
                <PokemonCard
                  className="results__card"
                  key={index}
                  image={card.images.small}
                  cardname={card.name}
                  setname={card.set.name}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResults;
