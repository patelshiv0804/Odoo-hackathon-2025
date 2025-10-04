import { useState } from "react";
import styles from "../styles/signup_details.module.css";
import axios from "axios";

export default function Signup_details({
  setShowLoginModal,
  setShowSignupModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
    "Netherlands",
    "Spain",
    "Other",
  ];

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!email || !password || !company || !country) {
      setError("Please enter email, password, company name and select a country.");
      return;
    }

    try {
      const response = await fetch(
        "https://xpensa.onrender.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, company, country }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error during sign up.");
      }

      const data = await response.json();
      setSuccess("User registered successfully! Please log in.");
      setShowSignupModal(false);
      setShowLoginModal(true);
    } catch (err) {
      setError(
        err.message || "Error connecting to the server. Please try again later."
      );
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Sign Up</p>
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

          {/* new row: company + country */}
          <div className={styles.row}>
            <input
              className={styles.details}
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <select
              className={`${styles.details} ${styles.select}`}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button className={styles.button_login} onClick={handleSignup}>
          <p>Sign Up</p>
        </button>

        <p className={styles.forgot}>
          By creating an account, you agree to Expensa's &nbsp;
          <b>Terms of Use and Privacy Policy</b>
        </p>
        <hr className={styles.line} />

        <p>
          Already have an account?{" "}
          <span
            className={styles.login_link}
            onClick={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
