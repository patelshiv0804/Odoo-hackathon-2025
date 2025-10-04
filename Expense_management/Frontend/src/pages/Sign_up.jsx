import Signup_details from "../component/Signup_details";
import styles from "../styles/sign_up.module.css";
import Signup_img from "../../Images/Signup_image.png";
export default function Sign_up({ setShowLoginModal, setShowSignupModal }) {
  return (
    <div className={styles.container}>
      <div className={styles.signup_image}>
        <img
          className={styles.image}
          src={Signup_img}
          alt="Signup illustration"
        />
      </div>

      <Signup_details
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />
    </div>
  );
}
