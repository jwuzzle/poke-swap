import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchHome from "../pages/SearchHome/SearchHome"
import SearchResults from "../pages/SearchResults/SearchResults"
import PokemonCardDetails from "../pages/PokemonCardDetails/PokemonCardDetails"
import './App.scss'
import PokeballLoader from "../components/PokeballLoader/PokeballLoader";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
import CreateCardPostPage from "../pages/CreateCardPostPage/CreateCardPostPage";

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
