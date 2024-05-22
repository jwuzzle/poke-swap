import React from "react";
import PokemonCardDetailsComp from "../../components/PokemonCardDetails/PokemonCardDetailsComp";
import { useParams } from "react-router-dom";
import PokemonCardAbilitiesDetails from "../../components/PokemonCardDetails/PokemonCardAbilitiesDetails";
import PokemonCardAttacksDetails from "../../components/PokemonCardDetails/PokemonCardAttacksDetails";
import PokemonCardWeaknessDetails from "../../components/PokemonCardDetails/PokemonCardWeaknessDetails";
import PokemonCardImage from "../../components/PokemonCardDetails/PokemonCardImage";
import PokemonCardPricing from "../../components/PokemonCardDetails/PokemonCardPricing";
import CardListings from "../../components/CardListings/CardListings";

const PokemonCardDetails = () => {
  const { id } = useParams();

  const pokeDataObjectFromStorage = sessionStorage.getItem("pokedata object");
  const pokeDataObjectParsed = JSON.parse(pokeDataObjectFromStorage);

  console.log(pokeDataObjectParsed);

  const filteredPokeDataObject = pokeDataObjectParsed.filter(
    (poke) => poke.id === id
  );

  console.log(filteredPokeDataObject);
  console.log(filteredPokeDataObject[0].name);
  console.log(filteredPokeDataObject[0].supertype);

  const pricingObject = Object.entries(filteredPokeDataObject[0].tcgplayer.prices);
  const innerArray = pricingObject[0]
  const firstElement = innerArray[0]
  console.log(firstElement)
    console.log(pricingObject)
    console.log(pricingObject[0])
    console.log(pricingObject[1])

  return (
    <>
      <div></div>
      <PokemonCardImage 
      image={filteredPokeDataObject[0].images.small}
      cardname={filteredPokeDataObject[0].name} />
      <PokemonCardDetailsComp 
      logo={filteredPokeDataObject[0].set.images.logo}
      cardname={filteredPokeDataObject[0].name}
      setname={filteredPokeDataObject[0].set.name}
      setreleasedate={filteredPokeDataObject[0].set.releaseDate}
      cardnumber={filteredPokeDataObject[0].number}
      tcgplayer={filteredPokeDataObject[0].tcgplayer.url}
      hp={filteredPokeDataObject[0].hp}
      type={filteredPokeDataObject[0].types}
      evolve={filteredPokeDataObject[0].evolvesFrom}
      rules={filteredPokeDataObject[0].rules}
      retrestcost={filteredPokeDataObject[0].set.releaseDate}
       />
       {filteredPokeDataObject[0].abilities !== undefined  ? (filteredPokeDataObject[0].abilities.map((ability, index) => (<PokemonCardAbilitiesDetails
        key={index}
        abilityname={ability.name}
        abilitytext={ability.text} />))) : ("")}
        {filteredPokeDataObject[0].attacks !== undefined  ? (filteredPokeDataObject[0].attacks.map((attack, index) => (<PokemonCardAttacksDetails
        key={index}
        attackname={attack.name}
        attackcost={attack.cost}
        attacktext={attack.text}
        attackcovertenergycost={attack.convertedEnergyCost}
        attackdamage={attack.damage} />))) : ("")}
        {filteredPokeDataObject[0].weaknesses !== undefined  ? (filteredPokeDataObject[0].weaknesses.map((weak, index) => (<PokemonCardWeaknessDetails
        key={index}
        weaknesstype={weak.type}
        weaknessvalue={weak.value} />))) : ("")}
        <PokemonCardPricing />
        <CardListings />
    </>
  );
};
export default PokemonCardDetails;
