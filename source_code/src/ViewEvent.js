import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Menubar from './Menubar'; 

function ViewEvent() {
  const [events, setEvent] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/getEvent')
    .then(function (response) {
      setEvent(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, []);

  

  return (
    <div className="container">
        <Menubar />
                <h2 className="card-title text-center">View Events</h2>
                <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Event Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Budget</th>
                        <th>Bio</th>
                        <th>friends Emails</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((events, index) => (
                        <tr key={index}>
                            <td>{events.email}</td>
                            <td>{events.eventName}</td>
                            <td>{events.startDate}</td>
                            <td>{events.endDate}</td>
                            <td>{events.budget}</td>
                            <td>{events.bio}</td>
                            <td>{events.friendsEmails}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    
  );
}
export default ViewEvent;

