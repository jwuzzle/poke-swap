import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchHome from "../pages/SearchHome/SearchHome"
import SearchResults from "../pages/SearchResults/SearchResults"
import './App.scss'
import NavigationBar from "../components/NavigationBar/NavigationBar";

function App() {

  return (
    <>
      <BrowserRouter>
      <NavigationBar />
        <Routes>
        <Route path="/" element={<SearchHome />} />
        <Route path="/search/:name" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
