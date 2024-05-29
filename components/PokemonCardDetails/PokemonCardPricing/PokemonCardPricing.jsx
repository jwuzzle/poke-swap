import { useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonCardPricing.scss";

const PokemonCardPricing = (props) => {
  const { id } = useParams();

  const pokeDataObjectFromStorage = sessionStorage.getItem("pokedata object");
  const pokeDataObjectParsed = JSON.parse(pokeDataObjectFromStorage);

  const filteredPokeDataObject = pokeDataObjectParsed.filter(
    (poke) => poke.id === id
  );

  const pricingObject = Object.entries(
    filteredPokeDataObject[0].tcgplayer.prices
  );
  const innerArray = pricingObject[0];
  const firstElement = innerArray[0];
  console.log(innerArray);

  const [foil, setFoil] = useState(firstElement);
  const [pricingDetails, setpricingDetails] = useState([innerArray[1]]);
  console.log(foil);
  console.log(pricingDetails);

  const handleFoilSelect = (event) => {
    const foilSelect = event.target.value;
    const index = pricingObject.findIndex((item) => item[0] === foilSelect);
  const selectedPricingDetails = [pricingObject[index][1]];
    console.log(foilSelect);
    console.log(index);
    console.log(selectedPricingDetails);
    setFoil(foilSelect);
    setpricingDetails(selectedPricingDetails);
  };

  return (
    <div className="pricing">
      <h1 className="pricing__header">Pricing: {/* <label htmlFor="price-select"></label> */}
   <select
        className="pricing__dropdown"
        name="price"
        id="price-select"
        onChange={(event) => handleFoilSelect(event)}
      >
        {pricingObject.map((pricetype, index) => (
          <option key={index} value={pricetype[0]}>
            {pricetype[0]}
          </option>
        ))}
      </select> </h1>
      <div className="pricing__price-data">
        {pricingDetails.map((pricetype, index) => (
          <div key={index}>
            <p className="pricing__label">Market Price: <span className="pricing__amount">${pricetype.market}</span></p>
            <p className="pricing__label">Low Price: <span className="pricing__amount">${pricetype.low}</span></p>
            <p className="pricing__label">Mid Price: <span className="pricing__amount">${pricetype.mid}</span></p>
            <p className="pricing__label">High Price: <span className="pricing__amount">${pricetype.high}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* marketprice={filteredPokeDataObject[0].tcgplayer.prices.holofoil.market}
      lowprice={filteredPokeDataObject[0].tcgplayer.prices.holofoil.low}
      midprice={filteredPokeDataObject[0].tcgplayer.prices.holofoil.mid}
      highprice={filteredPokeDataObject[0].tcgplayer.prices.holofoil.high} */

export default PokemonCardPricing;
