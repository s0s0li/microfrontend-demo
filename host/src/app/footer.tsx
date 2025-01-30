import React from 'react';
import styles from './app.module.css'; // Import the CSS module

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2023 Microfrontend Demo. All rights reserved.</p>
    </footer>
  );
}

export default Footer;