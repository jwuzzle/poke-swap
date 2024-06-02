import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchHome.scss";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const SearchHome = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    navigate(`/search/${searchValue.toLowerCase()}`);
  };

  const [images, setImages] = useState([]);
  const [imagesTwo, setImagesTwo] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered");
    const fetchImages = async () => {
      console.log("Fetching images");
      try {
        const response = await axios.get(`${baseURL}/cardimages`);
        const data = response.data;
        setImages(data);
        localStorage.setItem("images", JSON.stringify(data));
        console.log("Images fetched and state set");
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const fetchImages2 = async () => {
      console.log("Fetching images");
      try {
        const response = await axios.get(`${baseURL}/cardimages/second`);
        const data = response.data;
        setImagesTwo(data);
        localStorage.setItem("images", JSON.stringify(data));
        console.log("Images fetched and state set");
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
    fetchImages2();
  }, []);

  console.log("Rendered images:", images);

  return (
    <section className="search">
      {images.length === 0 ? (
        <p className="search__loading">loading...</p>
      ) : (
        <div>
          <div className="search-image-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.image_url}
                className={`search-image pos__index-${index}`}
              />
            ))}
          </div>
          <div className="search-image-container__bottom">
            {imagesTwo.map((image, index) => (
              <img
                key={index}
                src={image.image_url}
                className={`search-image pos__index-${index}--2`}
              />
            ))}
          </div>
          <div className="search-image-container__overlay"></div>
        </div>
      )}
      <div className="search__box">
        <h1 className="search__header">POKE SWAP</h1>
        <h2 className="search__subheader">Your Trading Marketplace</h2>
        <form className="search__form" onSubmit={onSubmit}>
          <input
            type="text"
            className="search__bar"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button className="search__button" type="submit">
            SEARCH
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchHome;
