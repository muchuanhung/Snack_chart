const Sidebar = ({ categories, activeCategory, onCategorySelect }) => (
  <aside className="sidebar">
    <div className="sidebar-category">甜點類別</div>
    <ul>
      {categories.map((category) => (
        <li
          key={category.name}
          className={activeCategory === category.name ? 'active' : ''}
          onClick={() => onCategorySelect(category.name)}
        >
          {category.name} ({category.count})
        </li>
      ))}
    </ul>
  </aside>
);

// 使用元件
const categories = [
  { name: '所有甜點', count: 48 },
  { name: '本日精選', count: 10 },
  { name: '人氣推薦', count: 26 },
  { name: '新品上市', count: 12 },
];

const [activeCategory, setActiveCategory] = useState('所有甜點');

<Sidebar
  categories={categories}
  activeCategory={activeCategory}
  onCategorySelect={setActiveCategory}
/>;

export default Sidebar;
