import styles from '../styles/login.module.css';
// import Login_details from '../component/Login_details';
import Login_details from '../component/Login_details';
import login_img from '../../Images/Login_image.png';

export default function Login({ setShowLoginModal, setShowSignupModal, setIsLoggedIn }) {
    return (
        <div className={styles.container}>
            <div className={styles.login_image}>
                <img className={styles.image} src={login_img} alt="" />
            </div>

    
                <Login_details
                    setShowLoginModal={setShowLoginModal}
                    setShowSignupModal={setShowSignupModal}
                    setIsLoggedIn={setIsLoggedIn}/>

        </div>
    );
}
