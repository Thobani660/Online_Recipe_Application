import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [showButtons, setShowButtons] = useState(false); // State to manage the visibility of buttons

    const handleGetStarted = () => {
        alert("getStarted")
        setShowButtons(!showButtons); // Toggle visibility of buttons
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                {/* <h1 style={styles.title}>Welcome to Recipe Manager</h1> */}
                <p style={styles.subtitle}>Discover and organize your favorite recipes!</p>
                <button style={styles.button} onClick={handleGetStarted}>
                    Get Started
                </button>
            </header>

            {showButtons && ( // Show buttons if the state is true
                <div style={styles.buttonContainer}>
                    <Link to="/login">
                        <button style={{ ...styles.button, backgroundColor: '#007bff' }}>
                            Sign In
                        </button>
                    </Link>
                    <Link to="/register">
                        <button style={{ ...styles.button, backgroundColor: '#28a745' }}>
                            Register
                        </button>
                    </Link>
                </div>
            )}

            <section style={styles.features}>
                <h2 style={styles.featuresTitle}>Features</h2>
                <div style={styles.featuresContainer}>
                    <div style={styles.feature}>
                        <h3>Recipe Collections</h3>
                        <p>Organize your recipes into custom collections for easy access.</p>
                    </div>
                    <div style={styles.feature}>
                        <h3>Search & Filter</h3>
                        <p>Find recipes quickly by searching and filtering by ingredients, cuisine, or dietary preferences.</p>
                    </div>
                    <div style={styles.feature}>
                        <h3>Share Your Recipes</h3>
                        <p>Share your favorite recipes with friends and family.</p>
                    </div>
                </div>
            </section>

            <section style={styles.testimonial}>
                <h2 style={styles.testimonialTitle}>What Users Say</h2>
                <p style={styles.testimonialText}>
                    "This app has transformed the way I cook! I can easily find and organize my favorite recipes." - Emma
                </p>
            </section>

            <footer style={styles.footer}>
                <p>© 2024 Recipe Manager App. All rights reserved.</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'none',
        color: '#333',
        textAlign: 'center',
        padding: '20px',
    },
    header: {
        backgroundColor: '#007bff57',
        color: 'white',
        padding: '50px 20px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px black',
    },
    subtitle: {
        fontSize: '18px',
        margin: '10px 0 20px',
        color: 'white'
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor:'grey'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    features: {
        margin: '40px 0',
    },
    featuresTitle: {
        fontSize: '28px',
        margin: '20px 0',
        color: 'lightgreen'
    },
    featuresContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        color: 'white'
    },
    feature: {
        width: '30%',
        padding: '20px',
        margin: '10px',
        backgroundColor: 'purple',
        borderRadius: '8px',
        boxShadow: '0 2px 5px white',
    },
    testimonial: {
        margin: '40px 0',
        padding: '20px',
        backgroundColor: 'transparent',
        borderRadius: '8px',
    },
    testimonialTitle: {
        fontSize: '24px',
        margin: '20px 0',
        color: 'lightgreen'
    },
    testimonialText: {
        fontStyle: 'italic',
        color: 'black',
        backgroundColor: 'orange',
        width: 'max-content',
        padding: "10px",
        borderRadius: "5px",
        boxShadow: '0 2px 5px white',
        marginLeft: "250px"
    },
    footer: {
        marginTop: '20px',
        fontSize: '14px',
        color: 'silver'
    },
};

export default Home;
