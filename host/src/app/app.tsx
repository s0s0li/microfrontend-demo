import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import styles from './app.module.css'; // Import CSS module
import Footer from './footer';

const Chat = React.lazy(() => import('chat/Module'));
const Email = React.lazy(() => import('email/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <div className={styles.appContainer}>
        {/* Navigation Bar */}
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/email">Email</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<NxWelcome title="host" />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/email" element={<Email />} />
        </Routes>
        <Footer />
      </div>
    </React.Suspense>
  );
}

export default App;