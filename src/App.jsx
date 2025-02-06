
import Search from "./routes/Search";
import Details from "./routes/Details";
import Home from "./routes/Home";
import Login from "./routes/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:type/:id" element={<Details />} />
          <Route path="/search/:search" element={<Search />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
