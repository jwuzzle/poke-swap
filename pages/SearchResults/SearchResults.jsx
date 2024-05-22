import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import PokeballLoader from '../../components/PokeballLoader/PokeballLoader';

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

    const stringifiedPokeData = JSON.stringify(pokeData);
    sessionStorage.setItem('pokedata object', stringifiedPokeData);

    return (
        <>
        {loading ? ( 
                <div>
                    <p>Gotta catch 'em all</p>
                    <PokeballLoader />
                </div>
            ) : (
                <div>
                <h2>{name.toUpperCase()} Pokemon Cards</h2>
            </div>
            )}

{loading ? (""
            ) : (
            pokeData.map((card, index) => (
                <div key={index}>
                    <Link 
                    className="card__link"
                    to={{
                        pathname: `/search/${card.name.toLowerCase()}/${card.id}`,
                    }} >
                    <PokemonCard
                    key={index}
                    image={card.images.small}
                    cardname={card.name}
                    setname={card.set.name}
                    />
                    </Link>
                    </div>
                ))
            )}
        </>
    );
};

export default SearchResults;
