import "./CardPostDetailsPage.scss"
import { useParams } from "react-router-dom";

const CardPostDetailsPage = () => {

    const { postid } = useParams();

    console.log(postid)

const postDataObjectFromStorage = sessionStorage.getItem("posts object");
  const postDataObjectParsed = JSON.parse(postDataObjectFromStorage);
  const postDataObjectParsedArray = postDataObjectParsed.cards

  console.log(postDataObjectParsedArray);

  const filteredPostDataObject = postDataObjectParsedArray.filter(
    (posts) => posts.id === parseInt(postid)
  );

  console.log(filteredPostDataObject)

  return (
    <div>CardPostDetailsPage
    <img src={filteredPostDataObject[0].image_url} />
    <p>{filteredPostDataObject[0].name}</p>
    <p>{filteredPostDataObject[0].username}</p>
    <p>{filteredPostDataObject[0].condition}</p>
    <p>{filteredPostDataObject[0].status.toUpperCase()}</p>
    <p>Placeholder for link to see Dash's other cards for trade</p>
    <p>Start a trade with {filteredPostDataObject[0].username}?</p>
    <button>Yes</button></div>

  )
}

export default CardPostDetailsPage