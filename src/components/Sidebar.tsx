import React from 'react';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className="sidebar__item active">ToDo List</li>
          <li className="sidebar__item">Unknown now #1</li>
          <li className="sidebar__item">Unknown now #2</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 