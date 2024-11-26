import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <>
      <aside className="sidebar mb-5 mb-md-0 me-md-4">
        <h2 className="sidebar-category">甜點類別</h2>
        <ul className="p-0">
          {categories.map((category) => (
            <li key={category.name}>
              <a
                href="#"
                className={activeCategory === category.name ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCategory(category.name);
                }}
                aria-current={
                  activeCategory === category.name ? 'page' : undefined
                }
              >
                {category.name} ({category.count})
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
