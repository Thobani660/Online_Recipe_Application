import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await axios.post('http://localhost:3000/register', { username, password });
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            setError('User already exists. Please choose a different username.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Sign Up</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>
                    Sign Up
                </button>
            </form>
            <p style={styles.footer}>
                Already have an account? <a href="/login" style={styles.link}>Sign In</a>
            </p>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginTop: '100px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    footer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    }
};

export default SignUpForm;
