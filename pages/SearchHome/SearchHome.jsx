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

  const [images, setImages] = useState(() => {
    const storedImages = localStorage.getItem('images');
    return storedImages ? JSON.parse(storedImages) : [];
  });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(baseURL);
        const data = response.data.data;
        setImages(data);
        localStorage.setItem('images', JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);


  console.log(images)


  return (
    <section className="search">
    {images.length === 0 ? <p className="search__loading">loading...</p> : <div className="search-image-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.images.small}
          className={`search-image pos-${index}`}
        />
      ))}
      <div className="search-image-container__overlay"></div>
    </div>}
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
