import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import defaultProfile from './defaultProfile.png'; 
import Menubar from './Menubar'; 

function Profile() {
    const [profileData, setProfileData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        about: '',
        profilePicture: '',
        interests: [],
        wishlist: []
    });
    
    function getCurrentUserId() {
        return localStorage.getItem('loggedInUser');
    }

    const navigate = useNavigate();
    const [unsavedInterests, setUnsavedInterests] = useState([]);
    const [tempProfileData, setTempProfileData] = useState({ ...profileData });
    const [allInterests, setAllInterests] = useState([]);
    const [showInterestsModal, setShowInterestsModal] = useState(false);
    const [newInterest, setNewInterest] = useState('');
    const [showAllInterests, setShowAllInterests] = useState('');
    

    useEffect(() => {
        const fetchData = async () => {
            const userId = getCurrentUserId();
            const value = { params: { userId } };
    
            try {
                const userResponse = await axios.get('http://localhost:9000/getUser', value);
                const userData = userResponse.data;
    
                const profileResponse = await axios.get('http://localhost:9000/getUserProfile', value);
                const profileData = profileResponse.data;
    
                const fetchedData = {
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    email: userData.email,
                    password: userData.password,
                    phone: userData.phone,
                    gender: userData.gender,
                    dateOfBirth: new Date(userData.dateOfBirth).toISOString().split('T')[0],
                    about: profileData.bio,
                    profilePicture: profileData.profilePicture || defaultProfile,
                    interests: profileData.interestID || [],
                    wishlist: profileData.wishlistID || []
                };
    
                setProfileData(fetchedData);
                setTempProfileData(fetchedData); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    

    const handleAddInterest = () => {
    if (newInterest.trim()) {
        setUnsavedInterests(prevInterests => [...prevInterests, newInterest]);
        setNewInterest('');
        setShowInterestsModal(false);
    } else {
        alert('Interest name cannot be empty.');
    }
};

    const addInterest = () => {
        setShowInterestsModal(!showInterestsModal);
    };
    

    const viewInterests = () => {
        const userId = getCurrentUserId();
        setShowAllInterests(!showAllInterests);
        if (!showAllInterests) { 
            axios.get(`http://localhost:9000/getUserInterests/${userId}`)
                .then(response => {
                    setAllInterests(response.data); 
                })
                .catch(error => {
                    console.error('Failed to fetch interests:', error);
                });
        }
    };


    


    const handleSaveProfile = async () => {
        const userId = getCurrentUserId();
        try {
            
            const updatedProfileData = {
                ...tempProfileData,
                interests: [...profileData.interests, ...unsavedInterests]
            };
    
            await axios.post(`http://localhost:9000/updateUserProfile/${userId}`, updatedProfileData);
            
            setProfileData(updatedProfileData); // Update the profile data with the changes
            setUnsavedInterests([]); // Clear the unsaved interests
            setShowInterestsModal(false); // Hide the interests modal
            alert('Profile saved successfully.');
        } catch (error) {
            console.error('Error saving profile data:', error);
        }
    };
    


    const goToWishlist = () => {
        navigate('/wishlist');
    };


    return (
        
        <div>
            <div style={{ position: 'absolute', top: '50px', left: '20px' }}> 

                <Menubar />
                </div>
        <div className="action-bar">
        <button onClick={handleSaveProfile}>Save</button>

        </div>

        <div className="profile-container">
            

            <div className="left-section">
                
                    <div className="profile-picture-box">
                    <img 
                    src={profileData.profilePicture || defaultProfile} 
                    alt="Profile"
                    onError={(e) => { e.target.src = defaultProfile; }} 
                />
                <label htmlFor="fileInput" className="edit-profile-picture">
    Edit Profile Picture
</label>


<input 
type="file" 
    id="fileInput" 
    accept="image/*" 
    style={{ display: 'none' }} 
/>
    


</div>
                  
<form>
<label htmlFor="firstname">Firstname</label>
    <input type="text" name="firstname" value={tempProfileData.firstname} readOnly />
    <label htmlFor="lastname">Lastname</label>
    <input type="text" name="lastname" value={tempProfileData.lastname} readOnly />
    <label htmlFor="email">Email</label>
    <input type="email" name="email" value={tempProfileData.email} readOnly />
    <label htmlFor="password">Password</label>
    <input type="password" name="password" value={tempProfileData.password} onChange={handleChange} placeholder="Password" />
    <label htmlFor="phone">Phone</label>
    <input type="text" name="phone" value={tempProfileData.phone} onChange={handleChange} placeholder="Phone" />
    <label htmlFor="gender">Gender</label>
    <select name="gender" value={tempProfileData.gender} onChange={handleChange}>   
        <option value="male">Male</option>
        <option value="female">Female</option>
    </select>
    <label htmlFor="dateOfBirth">Date of Birth</label>
    <input type="date" name="dateOfBirth" value={tempProfileData.dateOfBirth} onChange={handleChange} />
</form>
            </div>
            <div className="right-section">
                <label htmlFor="About">About me</label>
                <textarea name="about" value={tempProfileData.about} onChange={handleChange} placeholder="About me"></textarea>
                
                <div className="profile-interests">
    <h3>My Interests</h3>
    <div>
        <button type="button" className="button-spacing-right" onClick={() => setShowInterestsModal(true)}>Add Interest</button>
        <button type="button" onClick={viewInterests}>View All Interests</button>
    </div>
</div>
                
                <div className="profile-wishlist">
                    <h3>My Wishlist ♥︎ </h3>
                    <button type="button" onClick={goToWishlist}>View Wishlist</button>
                </div>
            </div>
    
            {showInterestsModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="modal-title">Add Interest</span>
                            <button onClick={addInterest} className="close-button">&times;</button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="interestName">Interest Name:</label>
                            <input
                                type="text"
                                id="interestName"
                                value={newInterest}
                                onChange={(e) => setNewInterest(e.target.value)}
                                placeholder="Type interest name"
                            />
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleAddInterest} className="save-button">Add Interest</button>
                        </div>
                    </div>
                </div>
            )}


{showAllInterests && (
    <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                <span className="modal-title">View All Interests</span>
                <button onClick={viewInterests} className="close-button">&times;</button>
            </div>
            <div className="modal-body">
                {allInterests.length > 0 ? (
                    allInterests.map((interest, index) => (
                        <div key={index}>{interest}</div>
                    ))
                ) : (
                    <p>No interests found.</p>
                )}
            </div>
        </div>
    </div>
)}

        </div>
        </div>
    );
    
}

export default Profile;