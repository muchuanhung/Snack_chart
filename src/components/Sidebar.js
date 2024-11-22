import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <>
      <aside className="sidebar mb-5 mb-md-0 me-md-4">
        <div className="sidebar-category">甜點類別</div>
        <ul className="p-0">
          {categories.map((category) => (
            <li
              key={category.name}
              className={activeCategory === category.name ? 'active' : ''}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name} ({category.count})
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
