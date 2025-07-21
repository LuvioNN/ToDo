import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ToDoList from './components/ToDoList';
import Diary from './components/Diary';
import AuthForm from './components/AuthForm';

import './assets/scss/main.scss';

const Navbar: React.FC<{ user: any; onLogout: () => void }> = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <header className="navbar">
      <div className="logo">🌟 Todary hub</div>
      <div className="account" ref={menuRef}>
        <span className="account__user" onClick={() => setOpen(o => !o)}>
          👤 {user?.login || 'User'}
        </span>
        {open && (
          <div className="account__menu">
            <button className="account__logout" onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

const USER_KEY = 'todary-user';

const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

const App: React.FC = () => {
  const [user, setUser] = useState(getStoredUser());

  const handleAuthSuccess = (user: any) => {
    setUser(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/todo" element={<ToDoList />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="*" element={<Navigate to="/todo" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
