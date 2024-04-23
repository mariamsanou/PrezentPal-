import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Wishlist from './Wishlist'
import Welcomepage from './Welcomepage';
import ViewEvent from './ViewEvent';
import PairGenerator from './PairGenerator';
import WishlistPage from './WishlistPage';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/" element={<Welcomepage />} />       
          <Route path="/home" element={<Welcomepage />} />        
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />   
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/viewevent" element={<ViewEvent />} />
          <Route path="/pairgenerator" element={<PairGenerator />} />
          
         
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;


