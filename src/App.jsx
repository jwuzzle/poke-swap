import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchHome from "../pages/SearchHome/SearchHome"
import './App.scss'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SearchHome />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
