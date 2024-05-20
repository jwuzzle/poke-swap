import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchHome.scss";

const SearchHome = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    navigate(`/search/${searchValue.toLowerCase()}`);
  };

  return (
    <section className="search">
      <div className="search__box">
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
