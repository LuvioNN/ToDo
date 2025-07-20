import React from 'react';
import './Sidebar.scss';

interface SidebarProps {
  section: 'todo' | 'diary';
  setSection: (section: 'todo' | 'diary') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ section, setSection }) => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li
            className={`sidebar__item${section === 'todo' ? ' active' : ''}`}
            onClick={() => setSection('todo')}
          >
            ToDo List
          </li>
          <li
            className={`sidebar__item${section === 'diary' ? ' active' : ''}`}
            onClick={() => setSection('diary')}
          >
            Diary
          </li>
          <li className="sidebar__item">Unknown now #3</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 