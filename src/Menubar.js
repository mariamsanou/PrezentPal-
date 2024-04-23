import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

function Menubar( ) {
    const [showMenu, setShowMenu] = useState(false);
    //const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div>
            <button onClick={toggleMenu}>Menu Bar</button>
            {showMenu && (
                <div>
                    {loggedInUser ? (
                        <>
                            <div>
                                <Link to="/dashboard">Dashboard</Link>
                            </div>
                            <div>
                                <Link to="/ViewEvent">View Event</Link>
                            </div>
                            <div>
                                <Link to="/createWishlist">Create Wishlist</Link>
                            </div>
                            <div>
                                <Link to="/viewReceiver">View Receiver</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <Link to="/login">Login</Link>
                            </div>
                            <div>
                                <Link to="/signup">Signup</Link>
                            </div>
                            
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Menubar;
