import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Menubar from './Menubar';

function Login() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const email = event.target.email.value;
        const password = event.target.password.value;
        const loginValues = { email, password };

        try {
            const response = await axios.post('http://localhost:9000/getUserLogin', loginValues);
            localStorage.setItem('loggedInUser', response.data._id); 
            navigate('/Profile');

        } catch (err) {

            setErrorMessage('Error in Login. Please check your credentials.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <Menubar />
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">
                    <h1>Login to PrezentPal</h1>
                    <div className="input-group">
                    <input type="email" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="input-group">
                        <input type="password" id="password" name="password" placeholder="Password" required />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Log in'}
                    </button>
                    <p className="signup-link">
                    Don't have an account? <a href="#" onClick={(e) => {
                        e.preventDefault();
                        navigate('/signup');
                    }}>Signup</a>
                </p>
                </form>
            </div>
        </>
    );
}

export default Login;
