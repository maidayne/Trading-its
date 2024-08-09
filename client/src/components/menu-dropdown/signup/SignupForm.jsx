import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../../context/AuthContext";
import './SignupForm.css';

const SignupForm = () => {
    const { login } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const toggleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prevShowConfirmPassword => !prevShowConfirmPassword);

    const handleSignup = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            // Giả định đăng ký thành công và đăng nhập ngay lập tức
            login();
            navigate("/dashboard");
        } else {
            alert("Passwords do not match");
        }
    };

    return (
        <div className="signup-form">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <div>
                        <input
                            type="text"
                            id="fullName"
                            className="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <div>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <div>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="password-icon"
                            onMouseDown={toggleShowPassword}
                            onMouseUp={toggleShowPassword}
                            onMouseLeave={() => setShowPassword(false)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <div className="password-container">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            className="password-icon"
                            onMouseDown={toggleShowConfirmPassword}
                            onMouseUp={toggleShowConfirmPassword}
                            onMouseLeave={() => setShowConfirmPassword(false)}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Signup</button>

                <p className="already-registered">Already registered? <a href="/login">Login</a></p>

                <div className="social-media-links">
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
            </form>
        </div>
    );
}

export default SignupForm;
