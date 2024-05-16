import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchHome from "../pages/SearchHome/SearchHome"
import SearchResults from "../pages/SearchResults/SearchResults"
import './App.scss'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SearchHome />} />
        <Route path="/search/:name" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
