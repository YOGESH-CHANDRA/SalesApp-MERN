import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./Pages/Home";
import AddSales from "./Pages/AddSales";
import TotalRevenue from "./Pages/TotalRevenue";
import Login from "./Pages/Login";
import Top5sales from "./Pages/Top5sales";
import Register from "./Pages/Register";
import Footer from "./component/Footer";
import PageNotFound from "./Pages/PageNotFound";

// routing and navigation of all pages

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addSales" element={<AddSales />} />
          <Route path="/top5sales" element={<Top5sales />} />
          <Route path="/totalRevenue" element={<TotalRevenue />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
