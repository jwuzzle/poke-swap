import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchHome = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    navigate(`/search/${searchValue.toLowerCase()}`);
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button type="submit">SEARCH</button>
      </form>
    </section>
  );
};

export default SearchHome;
