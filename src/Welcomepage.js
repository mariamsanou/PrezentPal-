import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import Menubar from './Menubar'; // Import the MenuBar component

//Created a welcome page that allows signing out, 
function Welcomepage() {

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
    <div style={{ backgroundColor: 'lightblue', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial' }}>
     <div style={{ position: 'absolute', top: '20px', left: '20px' }}> 

    <Menubar />
    </div>

    <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome There</h1>
    {loggedInUser ? (
        <div style={{ textAlign: 'center' }}>
            <p>Hello, {loggedInUser}</p>
            <div>
                <Link to="/dashboard" style={buttonStyle}>Dashboard</Link>
                <Link to="/viewEvent" style={buttonStyle}>View Event</Link>
                <button onClick={handleSignOut} style={buttonStyle}>Sign Out</button>
            </div>
        </div>
            
        ) : (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <p>Please Sign Up First</p>
            <p>Already have an account? <Link to="/login">Log In</Link></p>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    <h2>Create Event</h2>
                    
                    <form style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center', backgroundColor: 'white' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>First Name:</label>
                            <input type="text" placeholder="Enter your first name" />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Last Name:</label>
                            <input type="text" placeholder="Enter your last name" />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Email:</label>
                            <input type="email" placeholder="Enter your email" />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Event Name:</label>
                            <input type="text" placeholder="Enter event name" />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Start Date:</label>
                            <input type="date" />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>End Date:</label>
                            <input type="date" />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Budget:</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>$</span>
                                <input type="number" placeholder="Enter budget" />
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Bio:</label>
                            <textarea placeholder="Enter event bio" rows="4" />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Add Friends:</label>
                            <textarea placeholder="Enter friend's emails (separated by commas)" rows="2" />
                        </div>
                        <button type="submit">Create Event</button>
                    </form>


                </div>
        )}
        <p style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>Here are the list of Holidays!</p>
        <p style={{ textAlign: 'center', marginTop: '20px' }
    }>New Year's Day
    Christmas Day
    Thanksgiving Day (in the United States)
    Easter Sunday
    Hanukkah (Jewish holiday)
    Diwali (Hindu holiday)
    Ramadan (Islamic holiday)
    Father's Day
    International Women's Day
    International Workers' Day (May Day)
    Holi (Hindu spring festival of colors)
    Bastille Day (French National Day)
    Eid al-Fitr (Islamic holiday marking the end of Ramadan)
    Eid al-Adha
    Chinese New Year (Lunar New Year)
    Independence Day (in various countries)
    Valentine's Day
    Halloween
    Saint Patrick's Day
    Mother's Day </p>

    </div>
);
}

export default Welcomepage;

