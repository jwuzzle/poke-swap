import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchHome from "../pages/SearchHome/SearchHome"
import SearchResults from "../pages/SearchResults/SearchResults"
import PokemonCardDetails from "../pages/PokemonCardDetails/PokemonCardDetails"
import './App.scss'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SearchHome />} />
        <Route path="/search/:name" element={<SearchResults />} />
        <Route path="/search/:name/:id" element={<PokemonCardDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
