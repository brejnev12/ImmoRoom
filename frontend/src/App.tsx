import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import ItemDetail from "./pages/ItemDetail";
import './App.css';

const App: React.FC = () => (
  <Router>
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-cyan-600 text-white p-4 flex justify-center space-x-6">
        <Link to="/" className="hover:underline">ACCUEIL</Link>
        <Link to="/create" className="hover:underline">CREER ANNONCE</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
         <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </div>
  </Router>
);

export default App;
