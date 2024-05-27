import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchHome from "../pages/SearchHome/SearchHome"
import SearchResults from "../pages/SearchResults/SearchResults"
import PokemonCardDetails from "../pages/PokemonCardDetails/PokemonCardDetails"
import './App.scss'
import PokeballLoader from "../components/PokeballLoader/PokeballLoader";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
import CreateCardPostPage from "../pages/CreateCardPostPage/CreateCardPostPage";
import CreateAccountPage from "../pages/SignUpPages/CreateAccountPage/CreateAccountPage";
import CollectDemographicsPage from "../pages/SignUpPages/CollectAddressPage/CollectDemographicsPage";
import UserCardCollection from "../pages/UserCardCollectionPage/UserCardCollectionPage";
import CardPostDetailsPage from "../pages/CardPostDetailsPage/CardPostDetailsPage";

function App() {

  return (
    <>
      <BrowserRouter>
      <NavigationBar />
        <Routes>
        <Route path="/" element={<SearchHome />} />
        <Route path="/search/:name" element={<SearchResults />} />
        <Route path="/search/:name/:id" element={<PokemonCardDetails />} />
        <Route path="/loader" element={<PokeballLoader />} />
        <Route path="/search/:name/:id/upload" element={<CreateCardPostPage />} />
        <Route path="/search/:name/:id/listing/:postid" element={<CardPostDetailsPage />} />
        <Route path="/register/step1" element={<CreateAccountPage />} />
        <Route path="/register/step2" element={<CollectDemographicsPage />} />
        <Route path="/home" element={<SearchHome />} />
        <Route path="/collection" element={<UserCardCollection />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
