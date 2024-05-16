import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PokemonCard from '../../components/PokemonCard/PokemonCard'

const SearchResults = () => {
    let { name } = useParams();
    const [loading, setLoading] = useState(true);
    const [pokeData, setPokeData] = useState([]);

    useEffect(() => {
        const fetchPokeData = async () => {
            try {
                console.log("Name:", name)
                const response = await axios.get(`http://localhost:9080/?name=${name}`);
                console.log(response.data.data)
                setPokeData(response.data.data);
                setLoading(false);
            } catch(error) {
                console.error(error);
                setLoading(false);
            }
        }; 
        fetchPokeData();
    }, [name]);

    return (
        <>
        {loading ? ( 
                <div>
                    <h2>Gathering the Pokemon...</h2>
                </div>
            ) : (
                <div>
                <h2>{name.toUpperCase()} Pokemon Cards</h2>
            </div>
            )}

{loading ? (""
            ) : (
            pokeData.map((card, index) => (
                    <Link 
                    className="card__link"
                    to={`/search/${card.name.toLowerCase()}/${card.id}`}
                    key={index} >
                    <PokemonCard
                    image={card.images.small}
                    name={card.name}
                    setname={card.set.name}
                    />
                    </Link>
                ))
            )}
        </>
    );
};

export default SearchResults;
