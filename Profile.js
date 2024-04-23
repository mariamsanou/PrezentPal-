import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import defaultProfile from './defaultProfile.png'; 

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
        profilePicture: defaultProfile,
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
        const fetchData = async () => {
            const userId = getCurrentUserId();
            const value = { params: { userId } };
    
            try {
                const userResponse = await axios.get('http://localhost:9000/getUser', value);
                const userData = userResponse.data;
    
                const profileResponse = await axios.get('http://localhost:9000/getUserProfile', value);
                const profileData = profileResponse.data;
    
                setProfileData({
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
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData(prevState => ({
                    ...prevState,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
    
           
            const formData = new FormData();
            formData.append('profilePicture', file);
    
            axios.post('http://your-api-endpoint/user/profile/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log('Image uploaded successfully:', response.data.filePath);
                
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
        } else {
            alert('Please select an image file.');
        }
    };

    const handleAddInterest = () => {
        if (newInterest.trim()) {
            const userId = getCurrentUserId();
            axios.post('http://localhost:9000/createUserInterest', { userID: userId, interestName: newInterest })
                .then(response => {
                    setProfileData(prevState => ({
                        ...prevState,
                        interests: [...prevState.interests, newInterest]
                    }));
                    setNewInterest(''); 
                    setShowInterestsModal(false); 
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
        
        axios.post('http://localhost:9000/addWishlistItem', {
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
        <div>
        <div className="action-bar">
            <button onClick={handlesaveProfile}>Save</button>
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
                    id="fileInput" 
                    type="file" 
                    onChange={handleImageChange} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
/>


</div>
                  
                <form>
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" name="firstname" value={profileData.firstname} onChange={handleChange} placeholder="firstName" />
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" name="lastname" value={profileData.lastname} onChange={handleChange} placeholder="lastName" />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={profileData.password} onChange={handleChange} placeholder="Password" />
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" value={profileData.phone} onChange={handleChange} placeholder="Phone" />
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" value={profileData.gender} onChange={handleChange}>   
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <label htmlFor="dateofbirth">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleChange} />
                </form>
            </div>
            <div className="right-section">
                <label htmlFor="About">About me</label>
                <textarea name="about" value={profileData.about} onChange={handleChange} placeholder="About me"></textarea>
                
                <div className="profile-interests">
                    <h3>My Interests</h3>
                    {profileData.interests.map((interest, index) => <div key={index}>{interest}</div>)}
                    <button type="button" onClick={() => setShowInterestsModal(true)}>Add Interest</button>
                    <button type="button" onClick={viewInterests}>View All Interests</button>
                </div>
                
                <div className="profile-wishlist">
                    <h3>My Wishlist ♥︎ </h3>
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
        </div>
    );
    
}

export default Profile;
