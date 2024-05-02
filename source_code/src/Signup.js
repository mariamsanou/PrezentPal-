import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menubar from './Menubar';
import defaultProfile from './defaultProfile.png'; 
import './Signup.css';

function Signup() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedGender, setSelectedGender] = useState('');

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
    };

   
    

    const handleSignUp = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const form = event.target;
        const firstname = form.firstname.value;
        const lastname = form.lastname.value;
        const email = form.email.value;
        const password = form.password.value;
        const phone = form.phone.value;
        const day = form.day.value;
        const month = form.month.value;
        const year = form.year.value;
        const gender = form.gender.value;
        const signupValues = {
            firstname,
            lastname,
            email,
            password,
            phone,
            dateOfBirth: `${year}-${month}-${day}`,
            gender
        };

        try {
            const response = await axios.post('http://localhost:9000/createUser', signupValues);
            localStorage.setItem('loggedInUser', response.data._id);
            console.log('Signup successful:', response.data);
            alert('Signup Successful');

            // Assuming the response from createUser includes the user ID
            const userID = response.data._id;

            // Define initial profile values, possibly based on some defaults or empty
            const profileValues = {
                userID, // Link profile to user
                bio: '', // Empty bio to start with
                profilePicture: defaultProfile, // No initial picture
                // Initialize other IDs as null or handle them based on your application logic
                wishlistID: null,
                interestID: [],
                eventID: null,
                budgetID: null,
                deadlineID: null
            };

            const response2 = await axios.post('http://localhost:9000/createUserProfile', profileValues);
            console.log('Profile successful:', response2.data);
            alert('Profile Successful');
            navigate('/profile');


        } catch (err) {
            console.error('Error in Signing Up or creating profile:', err);
            setErrorMessage(err.response?.data?.message || 'Error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
        <Menubar />
        <div className="signup-container">

            <form onSubmit={handleSignUp} className="signup-form">
                <h1>Sign Up</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <input type="text" id="firstname" name="firstname" placeholder="First Name" required />
                <input type="text" id="lastname" name="lastname" placeholder="Last Name" required />
                <input type="email" id="email" name="email" placeholder="Email" required />
                <input type="password" id="password" name="password" placeholder="Password" required />
                <input type="phone" id="phone" name="phone" placeholder="Phone Number" required />

     
        
         <div className="dob">
            <label>Date of Birth</label>
                <div className="date-inputs">
                <input type="number" id="month" name="month" placeholder="MM" min="1" max="12" required />
                <input type="number" id="day" name="day" placeholder="DD" min="1" max="31" required />
                <input type="number" id="year" name="year" placeholder="YYYY" required />
            </div>
        </div>


        <div className="gender">
            <label>Gender</label>
                <div className="gender-btns">
                    <button type="button" 
                    className={`gender-btn ${selectedGender === 'male' ? 'active' : ''}`} 
                    onClick={() => handleGenderClick('male')}>
                     Male
                     </button>
                    <button type="button" 
                    className={`gender-btn ${selectedGender === 'female' ? 'active' : ''}`} 
                    onClick={() => handleGenderClick('female')}>
                    Female
                    </button>
            </div>
        </div>
                
<input type="hidden" name="gender" value={selectedGender} />

                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                <p className="login-link">
                    Already have an account? <a href="#" onClick={(e) => {
                        e.preventDefault();
                        navigate('/login');
                    }}>Log in</a>
                </p>
            </form>
        </div>
        </>
    );
}

export default Signup;