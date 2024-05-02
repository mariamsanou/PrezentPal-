import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Menubar( ) {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate("/login");
      };
   

    return (
        <div style={{ position: 'absolute', top: '30px', left: '20px' }}>
            
            <button onClick={toggleMenu}>Menu Bar</button>
            {showMenu && (
                <div>
                    {loggedInUser ? (
                        <>
                            <div>
                                <Link to="/profile">Profile</Link>
                            </div>
                            <div>
                                <Link to="/home">Create Event</Link>
                            </div>
                            <div>
                                <Link to="/viewevent">View Event</Link>
                            </div>
                            <div>
                                <Link to="/wishlist"> Wishlist</Link>
                            </div>
                            <div>
                                <Link to="/friends">My Friends</Link>
                            </div>         <div>
                                <Link to="/request">Send Friend Request</Link>
                            </div>
                            <div>
                                <Link to="/pairgenerator">Pair Generator</Link>
                            </div>
                            <div>
                                <Link to="/pairview">Pair View</Link>
                            </div>

                            <button onClick={handleSignOut}>Sign Out</button>

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