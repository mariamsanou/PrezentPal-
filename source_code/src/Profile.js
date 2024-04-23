import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    function getCurrentUserId() {
        return localStorage.getItem('loggedInUser');
    }

    const [showInterestsModal, setShowInterestsModal] = useState(false);
    const [newInterest, setNewInterest] = useState('');
    const [showAllInterests, setShowAllInterests] = useState('');
    const [showWishlistModal, setShowWishlistModal] = useState(false);
    const [wishlistItemName, setWishlistItemName] = useState('');
    const [selectedInterest, setSelectedInterest] = useState('');
    const [wishlistItemDescription, setWishlistItemDescription] = useState('');

    
    useEffect(() => {
        const userId = getCurrentUserId();

        const value = { userId };

        const response2 = axios.get('http://localhost:9000/getUser', value);
        console.log('User successful:', response2.data);


        axios.get(`http://localhost:9000/getUserProfile', value`)
            .then(response => {
                const data = response.data;
                setProfileData({
                    firstname: response2.firstname,
                    lastname: response2.lastname,
                    email: response2.email,
                    password: response2.password,
                    phone: response2.phone,
                    gender: response2.gender,
                    dateOfBirth: response2.dateOfBirth,
                    about: data.bio,
                    profilePicture: data.profilePicture,
                    interests: data.interestID || [], // Fallback to empty array if undefined
                    wishlist: data.wishlistID || []   // Fallback to empty array if undefined
                    
                });
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('profilePicture', file);

        axios.post('http://your-api-endpoint/user/profile/upload', formData)
            .then(response => {
                setProfileData(prevState => ({
                    ...prevState,
                    profilePicture: response.data.filePath // Assuming API returns the path of the saved image
                }));
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    };

    const handleAddInterest = () => {
        if (newInterest.trim()) {
            axios.post('http://your-api-endpoint/user/interests/add', { interest: newInterest })
                .then(response => {
                    setProfileData(prevState => ({
                        ...prevState,
                        interests: [...prevState.interests, newInterest]
                    }));
                    setNewInterest(''); // Reset the input
                    setShowInterestsModal(false); // Close modal
                })
                .catch(error => {
                    console.error('Error saving new interest:', error);
                });
        } else {
            alert('Interest name cannot be empty.');
        }
    };

    const addInterest = () => {
        setShowInterestsModal(!showInterestsModal);
    };

    const viewInterests = () =>{
        setShowAllInterests(!showAllInterests);
    }


    const handleAddWishlistItem = () => {
       
        if (!wishlistItemName.trim() || !wishlistItemDescription.trim()) {
            alert('Please fill in all fields.');
            return;
        }
        
        axios.post('http://your-api-endpoint/user/wishlist/add', {
            name: wishlistItemName,
            interestTag: selectedInterest,
            description: wishlistItemDescription
        }).then(response => {
            setProfileData(prevState => ({
                ...prevState,
                wishlist: [...prevState.wishlist, response.data]
            }));
            
            setWishlistItemName('');
            setSelectedInterest('');
            setWishlistItemDescription('');
            setShowWishlistModal(false);
        }).catch(error => {
            console.error('Error adding to wishlist:', error);
        });
    };

    const addItemToWishlist = () => {
        setShowWishlistModal(true); 
    };

    const handlesaveProfile = () => {
        axios.post('http://your-api-endpoint/user/profile/save', profileData)
            .then(() => {
                alert('Profile saved successfully.');
            })
            .catch(error => {
                console.error('Error saving profile data:', error);
            });
    };


    const goToWishlist = () => {
        navigate('/Wishlist');
    };

    return (
        <div className="profile-container">
            <div className="left-section">
                
                    <button onClick={handlesaveProfile}>Save</button>

                    <div className="profile-picture-box">
                    {/* Updated img tag with onError handling */}
                    <img 
                        src={profileData.profilePicture || 'defaultProfile.png'} 
                        alt="Profile"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image.png'; }}
                    />
                    <input type="file" onChange={handleImageChange} />
                </div>
                  
                <form>
                    <input type="text" name="name" value={profileData.firstname} onChange={handleChange} placeholder="Name" />
                    <input type="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email" />
                    <input type="password" name="password" value={profileData.password} onChange={handleChange} placeholder="Password" />
                    <input type="text" name="phone" value={profileData.phone} onChange={handleChange} placeholder="Phone" />
                    <select name="gender" value={profileData.gender} onChange={handleChange}>
                        <option value="gender">gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="date" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleChange} />
                </form>
            </div>
            <div className="right-section">
                <textarea name="about" value={profileData.about} onChange={handleChange} placeholder="About me"></textarea>
                
                <div className="profile-interests">
                    <h3>My Interests</h3>
                    {profileData.interests.map((interest, index) => <div key={index}>{interest}</div>)}
                    <button type="button" onClick={() => setShowInterestsModal(true)}>Add Interest</button>
                    <button type="button" onClick={viewInterests}>View All Interests</button>
                </div>
                
                <div className="profile-wishlist">
                    <h3>My Wishlist</h3>
                    {profileData.wishlist.map((item, index) => <div key={index}>{item.name}: {item.description}</div>)}
                    <button type="button" onClick={addItemToWishlist}>Add Item</button>
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
                            
                        </div>
                        
                    </div>
                </div>
            )}


            
            {showWishlistModal && (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="modal-title">Add Wishlist Item</span>
                        <button onClick={() => setShowWishlistModal(false)} className="close-button">&times;</button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="wishlistItemName">Name:</label>
                        <input
                            type="text"
                            id="wishlistItemName"
                            value={wishlistItemName}
                            onChange={(e) => setWishlistItemName(e.target.value)}
                            placeholder="Enter name"
                        />
                        <label htmlFor="interestTag">Interest Tag:</label>
                        <select
                            id="interestTag"
                            value={selectedInterest}
                            onChange={(e) => setSelectedInterest(e.target.value)}
                        >
                            <option value="">Select interest</option>
                            {profileData.interests.map((interest, index) => (
                                <option key={index} value={interest}>
                                    {interest}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="wishlistItemDescription">Description:</label>
                        <textarea
                            id="wishlistItemDescription"
                            value={wishlistItemDescription}
                            onChange={(e) => setWishlistItemDescription(e.target.value)}
                            placeholder="Enter description"
                        />
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleAddWishlistItem} className="save-button">Add Item</button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
    
}

export default Profile;
