import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = import.meta.env.VITE_APP_BASE_URL;


const AllSetsList = () => {

    const [allSetsList, setAllSetsList] = useState([]);
    useEffect(() => {
    const getListOfSets = async () => {
        try {
            const response = await axios.get(`${baseURL}/allsets`);
            console.log(response.data)
            setAllSetsList(response.data.data);
        } catch {error} {
            console.error("Error fetching list of all sets:");
        }
    }; 
    getListOfSets();
    }, [])


    console.log(allSetsList)

  return (
    <div>
        <h1>AllSetsList</h1>
        {allSetsList.map((sets) => (
            <div key={sets.id}>
            <p>{sets.name}</p>
            <p>{sets.series}</p>
            <img src={sets.images.logo} />
            </div>
        ))}

    </div>
  )
}

export default AllSetsList