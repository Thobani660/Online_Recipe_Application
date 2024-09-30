// Home.jsx
import React from 'react';

function Home() {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Welcome to Recipe Manager</h1>
                <p style={styles.subtitle}>Discover and organize your favorite recipes!</p>
                <button style={styles.button} onClick={() => alert('Get Started!')}>
                    Get Started
                </button>
            </header>

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
        backgroundColor: '#f9f9f9',
        color: '#333',
        textAlign: 'center',
        padding: '20px',
    },
    header: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '50px 20px',
        borderRadius: '8px',
    },
    title: {
        fontSize: '36px',
        margin: '0',
    },
    subtitle: {
        fontSize: '18px',
        margin: '10px 0 20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    features: {
        margin: '40px 0',
    },
    featuresTitle: {
        fontSize: '28px',
        margin: '20px 0',
    },
    featuresContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    feature: {
        width: '30%',
        padding: '20px',
        margin: '10px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    testimonial: {
        margin: '40px 0',
        padding: '20px',
        backgroundColor: '#f1f1f1',
        borderRadius: '8px',
    },
    testimonialTitle: {
        fontSize: '24px',
        margin: '20px 0',
    },
    testimonialText: {
        fontStyle: 'italic',
    },
    footer: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#777',
    },
};

export default Home;
