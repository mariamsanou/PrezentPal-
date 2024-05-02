import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Profile.css';
import { UserContext } from './UserContext'; 
import Menubar from './Menubar';

function FriendRequests() {
    //const { loggedInUser } = useContext(UserContext); // Access loggedInUser from context
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch friend requests from the server when the component mounts
        async function fetchRequests() {
            try {
                const response = await axios.get(`http://localhost:9000/getFriendRequests?userId=${requests}`);
                setRequests(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching friend requests:', error);
                setIsLoading(false);
            }
        }

        fetchRequests();

        // Clean up function to abort fetching requests if the component unmounts
        return () => {
            setIsLoading(true); 
        };
    }, []); 

    const handleAcceptRequest = async (requestId) => {
        try {
            await axios.post(`http://localhost:9000/acceptFriendRequest/${requestId}`);
            setRequests(requests.filter(request => request._id !== requestId));
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleDeclineRequest = async (requestId) => {
        try {
            await axios.post(`http://localhost:9000/declineFriendRequest/${requestId}`);
            setRequests(requests.filter(request => request._id !== requestId));
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    };

    return (
        <div className="friend-requests-container">
            <Menubar />
            <h2>Friend Requests</h2>
            {isLoading ? (
                <p>Loading friend requests...</p>
            ) : requests.length === 0 ? (
                <p>No friend requests to display.</p>
            ) : (
                <ul>
                    {requests.map(request => (
                        <li key={request._id}>
                            <span>{request.senderName} wants to be your friend.</span>
                            <button onClick={() => handleAcceptRequest(request._id)}>Accept</button>
                            <button onClick={() => handleDeclineRequest(request._id)}>Decline</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FriendRequests;
