import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className={`sidebar__item${location.pathname === '/todo' ? ' active' : ''}`}>
            <Link to="/todo">ToDo List</Link>
          </li>
          <li className={`sidebar__item${location.pathname === '/diary' ? ' active' : ''}`}>
            <Link to="/diary">Diary</Link>
          </li>
          <li className="sidebar__item">Unknown now #3</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 