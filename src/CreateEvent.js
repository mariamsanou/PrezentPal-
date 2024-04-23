import React, { useState } from 'react';
import axios from 'axios';


function CreateEvent() {

    const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [bio, setBio] = useState([]);
  const [friendsEmails, setFriendsEmails] = useState([]);

  

  const handleSubmit = (event) => {
    //alert(email)
    event.preventDefault();
    axios.post('http://localhost:9000/createEvent', 
    {email,eventName,startDate,endDate,budget,bio,friendsEmails})
    .then((res) => {
        alert('Creating event was Successful');
        window.location.href = '/';

    })
      .catch(error => {
        console.error('Error creating event:', error);
      });
    };





return (
    <form style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center', backgroundColor: 'white' }}>
        <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <label>Event Name:</label>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Enter event name" />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <label>Budget:</label>
            <span>$</span>
            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Enter budget" />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <label>Bio:</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter event bio" rows="4" />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <label>Add Friends:</label>
            <textarea value={friendsEmails} onChange={(e) => setFriendsEmails(e.target.value)} placeholder="Enter friend's emails (separated by commas)" rows="2" />
        </div>
        <br />
        <button onClick={handleSubmit}>Submit</button>
    </form>
);
}

export default CreateEvent;
