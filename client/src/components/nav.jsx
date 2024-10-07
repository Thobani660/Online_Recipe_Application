import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <button onClick={toggleMenu} style={styles.hamburger}>
          {/* Hamburger icon (3 lines) */}
          <span style={styles.line}></span>
          <span style={styles.line}></span>
          <span style={styles.line}></span>
        </button>
        
        {/* Full menu or Hamburger menu based on screen size */}
        <ul style={{ ...styles.navList, ...(isOpen ? styles.navListOpen : {}) }}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/login" style={styles.navLink}>Login</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/register" style={styles.navLink}>Register</Link>
          </li>
          <li style={styles.navItem1}>
            <Link to="/" style={styles.navLink}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/recipes" style={styles.navLink}>Recipes</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/privacy-policy" style={styles.navLink}>Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '20px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'flex-end', // Aligns the entire nav list to the right
    alignItems: 'center',
    width: '100%',
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end', // Pushes the nav links to the right
    transition: 'transform 0.3s ease-in-out',
  },
  navListOpen: {
    display: 'block',
    position: 'absolute',
    top: '60px', // Adjust this value according to the height of your navbar
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: '20px 0',
    zIndex: 999,
  },
  navItem: {
    margin: '0 10px',
  },
  // navItem1:{
  //   backgroundColor:"blue",
  //   width:"200px"
  // },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    textShadow: '1px 1px 5px yellow', // White shadow
  },
  hamburger: {
    display: 'none', // Hidden by default, will be shown on smaller screens
    flexDirection: 'column',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  line: {
    width: '25px',
    height: '3px',
    backgroundColor: 'white',
    margin: '4px 0',
  },
  '@media (max-width: 768px)': {
    hamburger: {
      display: 'flex', // Show hamburger on small screens
    },
    navList: {
      display: 'none', // Hide menu on small screens initially
    },
    navListOpen: {
      display: 'block', // Show menu when open
    },
  },
};

export default Navbar;
