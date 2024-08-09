import React, { useState, useRef, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTradeFederation } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        window.location.href = "/login";
    };

    return (
        <header className="header">
            <div className="logo">
                <a href='/dashboard' className='logo-icon'>
                    <FontAwesomeIcon icon={faTradeFederation} />
                </a>
            </div>

            <nav className="nav">
                <a href="/dashboard">Dashboard</a>
                <a href="/portfolio">Portfolio</a>
                <a href="/market-overview">Market Overview</a>
                <a href="/watchlist">Watch List</a>
            </nav>

            <div className="user-icon" onClick={handleToggleDropdown} ref={dropdownRef}>
                <FontAwesomeIcon icon={faUser} />
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        {!isLoggedIn ? (
                            <>
                                <a href="/login">Sign In</a>
                                <a href="/signup">Sign Up</a>
                            </>
                        ) : (
                            <>
                                <a href="/view-profile">View Profile</a>
                                <a href="/settings">Settings</a>
                                <a href="#" onClick={handleLogout}>Log Out</a>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
