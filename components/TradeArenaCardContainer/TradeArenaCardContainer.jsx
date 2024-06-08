import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";
import "./TradeArenaCardContainer.scss";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

const TradeArenaCardContainer = (props) => {
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const data = props.data;
  console.log(data);
  
  if (!data || data.length === 0) {
    return <p>Loading...</p>;
}

const itemCount = data.length;
console.log(itemCount)
const slidePercentage = isTabletOrDesktop ? 100 / itemCount : 100;

  return (
    <div className="carousel">
      <Carousel
        showThumbs={false}
        infiniteLoop
        showArrows={false}
        showStatus={false}
        centerMode={isTabletOrDesktop}
        centerSlidePercentage={10}
        showIndicators={isTabletOrDesktop ? false : true}
        className="carousel__preview"
      >
        {props.data &&
          props.data.map((array, index) => (
            <PokemonCard
              key={index}
              image={array.front_image_url}
              cardname={array.name}
              setname={array.set}
              condition={array.condition}
            />
          ))}
      </Carousel>
    </div>
  );
};

export default TradeArenaCardContainer;
