import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
// import styles from "../styles/landing_page.css";
import styles from "../styles/landing_page.module.css";
import Login from "../pages/Login";
import Sign_up from "../pages/Sign_up";

export default function Landing_page() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={`${styles.half_navbar} ${menuOpen ? styles.show : ''}`}>
                    <li className={styles.home} onClick={() => handleNavigation('/')}>Home</li>
                    <li className={styles.about} onClick={() => handleNavigation('/about')}>About us</li>
                    <li className={styles.contact} onClick={() => handleNavigation('/contact')}>Contact us</li>
                    <Button
                        className={styles.button}
                        text="Log In"
                        onClick={() => {
                            setShowLoginModal(true);
                            setMenuOpen(false);
                        }}
                    />
                </div>
            </div>

            {menuOpen && <div className={styles.menuOverlay} onClick={() => setMenuOpen(false)}></div>}

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Manage Expenses Smarter</h1>
                    <p className={styles.heroSubtitle}>
                        Streamline your expense management with multi-level approvals, 
                        role-based access, and automated workflows. Save time and reduce errors.
                    </p>
                    <button className={styles.ctaButton} onClick={() => setShowSignupModal(true)}>
                        Get Started
                    </button>
                </div>
                <div className={styles.heroImage}>
                    <div className={styles.heroPlaceholder}>
                        <span>📊</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <h2 className={styles.sectionTitle}>Core Features</h2>
                <p className={styles.sectionSubtitle}>Everything you need to manage expenses efficiently</p>
                
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>✓</div>
                        <h3>Multi-Level Approvals</h3>
                        <p>Set up customizable approval workflows with multiple levels to ensure proper authorization and compliance.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>👥</div>
                        <h3>Role-Based Access</h3>
                        <p>Control permissions with distinct roles for Admin, Manager, and Employee with tailored dashboards.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>💱</div>
                        <h3>Currency Auto-Conversion</h3>
                        <p>Automatically convert expenses to your base currency with real-time exchange rates.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>📸</div>
                        <h3>OCR Receipt Scanning</h3>
                        <p>Upload receipts and extract data automatically using advanced OCR technology for faster processing.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className={styles.howItWorksSection}>
                <h2 className={styles.sectionTitle}>How It Works</h2>
                <p className={styles.sectionSubtitle}>Get started in three simple steps</p>
                
                <div className={styles.stepsContainer}>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>1</div>
                        <h3>Register Your Account</h3>
                        <p>Sign up with your email and create your organization profile in minutes.</p>
                    </div>

                    <div className={styles.stepArrow}>→</div>

                    <div className={styles.step}>
                        <div className={styles.stepNumber}>2</div>
                        <h3>Submit Expense</h3>
                        <p>Upload receipts, add details, and submit expenses for approval with just a few clicks.</p>
                    </div>

                    <div className={styles.stepArrow}>→</div>

                    <div className={styles.step}>
                        <div className={styles.stepNumber}>3</div>
                        <h3>Approval Flow</h3>
                        <p>Track your expense through the approval workflow and get reimbursed faster.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <h2>Ready to Get Started?</h2>
                <p>Join thousands of companies managing their expenses smarter</p>
                <button className={styles.ctaButtonLarge} onClick={() => setShowSignupModal(true)}>
                    Sign Up Now
                </button>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.footerCopyright}>© 2025 ExpenseTracker. All rights reserved.</p>
                    <div className={styles.footerLinks}>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                        <a href="/privacy">Privacy Policy</a>
                    </div>
                </div>
            </footer>

            {/* Login Modal */}
            {showLoginModal && (
                <div className={styles.overlay} onClick={() => setShowLoginModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <Login setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal} />
                        <button className={styles.closeButton} onClick={() => setShowLoginModal(false)}>X</button>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {showSignupModal && (
                <div className={styles.overlay} onClick={() => setShowSignupModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <Sign_up setShowSignupModal={setShowSignupModal} setShowLoginModal={setShowLoginModal} />
                        <button className={styles.closeButton} onClick={() => setShowSignupModal(false)}>X</button>
                    </div>
                </div>
            )}
        </>
    );
}