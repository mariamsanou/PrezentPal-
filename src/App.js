import {React } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcomepage from './Welcomepage';
import WishlistPage from './WishlistPage';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcomepage />}/>
        <Route path="/home" element={<Welcomepage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;