import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function ViewEvent() {
  const [events, setEvent] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/getEvent')
      .then(response => {
        console.log('Response Data:', response.data); 
        setEvent(response.data);
      })
      .catch(error => {
        console.error('Error fetching Event:', error);
      });
  }, []);

  

  return (
    <div>
      <h2>View Event</h2>
      <ul>
        {events.map(event => (
          <li key={event.event_id}>
            <h3>Event Name: {event.eventName}</h3>
            <p>Start Date: {event.startDate}</p>
            <p>End Date: {event.endDate}</p>
            <p>Budget: ${event.budget}</p>
            <p>Bio: {event.bio}</p>
            <p>Friends' Emails: {event.friendsEmails.join(', ')}</p>
          </li>
        ))}
      </ul>

      <Link to="/">
        <button>Go back</button>
      </Link>
    </div>
  );
}
export default ViewEvent;


