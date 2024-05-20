import { useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>Pricing:</h1> <label htmlFor="price-select"></label>
      <select
        name="price"
        id="price-select"
        onChange={(event) => handleFoilSelect(event)}
      >
        {pricingObject.map((pricetype, index) => (
          <option key={index} value={pricetype[0]}>
            {pricetype[0]}
          </option>
        ))}
      </select>
      <div>
        {pricingDetails.map((pricetype, index) => (
          <div key={index}>
            <p>Market Price: ${pricetype.market}</p>
            <p>Low Price: ${pricetype.low}</p>
            <p>Mid Price: ${pricetype.mid}</p>
            <p>High Price: ${pricetype.high}</p>
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
