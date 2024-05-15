import axios from 'axios';
import { useState } from 'react';

const SearchHome = () => {
    
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [pokeData, setPokeData] = useState([])

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("Name:", name)
            setLoading(true);
            const response = await axios.get(`http://localhost:9080/?name=${name}`);
            console.log(response.data.data)
            setPokeData(response.data.data)
            setLoading(false);
        } catch(error) {
            console.error(error);
        }
    };


  return (
    <section>
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
                <button>SEARCH</button>
        </form>
        {loading ? ( 
            <div>
                <h2>Gathering the Pokemon...</h2>
            </div>
        ) : ("")}
        {pokeData.map((card, index) => (
            <img key={index} src={card.images.small} />
        ))}

    </section>
  )
}

export default SearchHome
