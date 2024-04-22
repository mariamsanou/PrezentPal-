import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // If you use it elsewhere in your component

//Created a welcome page that allows signing out, 
function WelcomePage() {

    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');

  const handleSignOut = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  const buttonStyle = {
    color: 'black',
    margin: '10px',
  };

  return (
    <div style={{ backgroundColor: 'lightblue', padding: '20px', fontFamily: 'Arial' }}>
        <h1>Welcome There</h1>
        {loggedInUser && (
            <p>Hello, {loggedInUser}</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Link to="/dashboard">
                <button style={buttonStyle}>Dashboard</button>
            </Link>
            {loggedInUser ? (
                <>
                    <Link to="/createEvent">
                        <button style={buttonStyle}>Create Event</button>
                    </Link>
                    <Link to="/joinEvent">
                        <button style={buttonStyle}>Join Event</button>
                    </Link>
                    <button type="button" onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <Link to="/signup">
                    <button style={buttonStyle}>Sign Up</button>
                </Link>
            )}
        </div>
        <div style={{ position: 'fixed', left: '0', top: '50%', transform: 'translateY(-50%)' }}>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
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
}

export default WelcomePage;