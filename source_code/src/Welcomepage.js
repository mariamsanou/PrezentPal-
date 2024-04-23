import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import CreateEvent from './CreateEvent';
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
     <div style={{ position: 'absolute', top: '50px', left: '20px' }}> 

    <Menubar />
    </div>

    <h1 style={{ textAlign: 'center', marginTop: '100px' }}>Welcome There</h1>
    {loggedInUser ? (
        <div style={{ textAlign: 'center' }}>
            <p>Hello, {loggedInUser}</p>
            <div>
                <Link to="/profile" >
                < button style={buttonStyle}>Dashboard </button>
                </Link>

                <Link to="/ViewEvent" >
                < button style={buttonStyle}>View Event</button>
                </Link>
                <button onClick={handleSignOut} style={buttonStyle}>Sign Out</button>
                <h2>Create Event</h2>
                    
                    <CreateEvent/>


               
            </div>
        </div>
            
        ) : (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <p>Please Sign Up First</p>
            <p>Already have an account? <Link to="/login">Log In</Link></p>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                   
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