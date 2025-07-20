import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ToDoList from './components/ToDoList';
import Diary from './components/Diary';

import './assets/scss/main.scss';

const Navbar: React.FC = () => (
  <header className="navbar">
    <div className="logo">🌟 Todary hub</div>
    <div className="account">👤 User</div>
  </header>
);

const App: React.FC = () => {
  const [section, setSection] = useState<'todo' | 'diary'>('todo');

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar section={section} setSection={setSection} />
        <main className="main-content">
          {section === 'todo' && <ToDoList />}
          {section === 'diary' && <Diary />}
        </main>
      </div>
    </>
  );
};

export default App;
