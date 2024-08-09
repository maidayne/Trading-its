import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const toggleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

    const handleLogin = (e) => {
        e.preventDefault();
        // Giả định đăng nhập thành công
        login();
        navigate("/dashboard");
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="password-input">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="password-icon"
                        onMouseDown={toggleShowPassword}
                        onMouseUp={toggleShowPassword}
                        onMouseLeave={() => setShowPassword(false)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </span>
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="/signup">Signup Now</a></p>
                <p>Forgot Password? <a href="/reset-password">Reset Password</a></p>
            </form>
        </div>
    );
};

export default LoginForm;
