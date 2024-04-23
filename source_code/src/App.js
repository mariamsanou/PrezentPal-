import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Wishlist from './Wishlist'



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/" element={<Login />} />          
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />   
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
         
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;


