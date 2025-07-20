import React from 'react';
import Sidebar from './components/Sidebar';
import './App.scss';
import ToDoList from './components/ToDoList';

const App: React.FC = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <ToDoList />
      </main>
    </div>
  );
};

export default App;
