
import Search from "./pages/Search";
import Details from "./pages/Details";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:type/:id" element={<Details />} />
        <Route path="/search/:search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
