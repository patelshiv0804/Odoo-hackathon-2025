import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "../styles/login_details.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Email_verification from "../../pages/Email_verification";
// import { GoogleLogin } from '@react-oauth/google';

export default function LoginDetails({ setShowLoginModal, setShowSignupModal }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const navigate = useNavigate();


    

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('https://xpensa.onrender.com/user/login', {
                email,
                password,
            });

            if (response.status === 200) {
                alert('Login Successful!');
                console.log('User Data:', response.data);
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = '/';
            } 
            else {
                setError(response.data.message || 'Login failed.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Invalid email or password.');
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email before proceeding.");
            return;
        }

        const response = await handleApiCall("https://xpensa.onrender.com/user/reset-request", { email });

        if (response && response.status === 200) {
            alert("OTP sent to your email successfully!");
            setShowForgotPassword(true);
        }
    };

    

    return (
        <div className={styles.container}>
            <p className={styles.heading}>Log In</p>
            <div className={styles.inner_container}>

                
                <hr className={styles.line} />

                <div className={styles.input_container}>
                    <input
                        className={styles.details}
                        type="text"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className={styles.details}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
 
                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.button_login} onClick={handleLogin}>
                    <p>Login</p>
                </button>
                <p className={styles.forgot} onClick={handleForgotPassword}>
                    Forgot Password?
                </p>
                <hr className={styles.line} />

                <p>
                    Don't have an account?{" "}
                    <span
                        className={styles.signup_link}
                        onClick={() => {
                            setShowLoginModal(false);
                            setShowSignupModal(true);
                        }}
                    >
                        Sign up
                    </span>
                </p>
            </div>

            {showForgotPassword && (
                <div className={styles.overlay} onClick={() => setShowForgotPassword(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <Email_verification email={email} />
                        <button className={styles.closeButton} onClick={() => setShowForgotPassword(false)}>
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
