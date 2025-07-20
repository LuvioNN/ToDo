import React from 'react';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className="sidebar__item active">ToDo List</li>
          <li className="sidebar__item">Раздел 2 (скоро)</li>
          <li className="sidebar__item">Раздел 3 (скоро)</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 