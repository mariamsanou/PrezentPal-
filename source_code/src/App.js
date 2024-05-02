import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Welcomepage from './Welcomepage';
import ViewEvent from './ViewEvent';
import PairGenerator from './PairGenerator';
import WishlistPage from './WishlistPage';
import SendFriendRequest from './SendFriendRequest';
import FriendRequest from './FriendRequests';
import PairView from './ViewYourPair';


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

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
          <Route path="/pairview" element={<PairView />} />
          
          <Route path="/friends" element={<FriendRequest />} />
          <Route path="/request" element={<SendFriendRequest loggedInUser={loggedInUser} />} />
{/*       
          <Route path="/" element={<Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} /> 
          */}

         
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;


