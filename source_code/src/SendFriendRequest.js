import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';
import Menubar from './Menubar';

function SendFriendRequest() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSendRequest = async (event) => {
        event.preventDefault();
            
        try {
            const response = await axios.get(`http://localhost:9000/getUserIdByEmail?email=${email}`);
            const userId = response.data.userId;
            // const requesterId = localStorage.setItem('loggedInUser', response.data.userId); 

            // const sendRequestResponse = await axios.post(`http://localhost:9000/sendFriendRequest`, {
            //     requesterId: requesterId, 
            //     recipientId: userId
            // });
            
           setSuccessMessage(`Friend request sent to user `);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('User not found with the provided email.');
            } else {
                setErrorMessage('Failed to send friend request. Please try again later.');
            }
        }

        
    };


    return (
        <div className="friend-request-container">
            <Menubar />
            <h2>Send Friend Request</h2>
            <form onSubmit={handleSendRequest} className="friend-request-form">
                <input
                    type="email"
                    placeholder="Enter friend's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Request</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
}

export default SendFriendRequest;
