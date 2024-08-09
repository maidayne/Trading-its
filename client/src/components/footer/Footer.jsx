import React from 'react';
import './Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="section">
                    <h3>About Us</h3>
                    <a href="/about">Company</a>
                    <a href="/careers">Careers</a>
                    <a href="/contact">Contact</a>
                </div>

                <div className="section">
                    <h3>Quick Links</h3>
                    <a href="/dashboard">Dashboard</a>
                    <a href="/portfolio">Portfolio</a>
                    <a href="/market-overview">Market Overview</a>
                    <a href="/watchlist">Watchlist</a>
                </div>

                <div className="section">
                    <h3>Follow Us</h3>
                    <div className="social-media">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Trading Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
