import {React, useState} from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

 const Navbar = () => {
     return(
     <div>
         <div>
             <ul>
                 <li>
                     <Link to="/dashboard">Dashboard</Link>
                 </li>
                 <li>
                     <Link to="/createEvent">Create Event</Link>
                 </li>
                 <li>
                     <Link to="/joinEvent">Join Event</Link>
                 </li>
                 <li>
                     <Link to="/profile">Profile</Link>
                 </li>
                 <li>
                     <Link to="/viewEvent">View Event</Link>
                 </li>
                 <li>
                     <Link to="/wishlist">Wishlist</Link>
                 </li>
                 <li>
                     <Link to="/viewHolidays">View Holidays</Link>
                 </li>
             </ul>
         </div>
     </div>
   );
 };

 export default Navbar;