
import { Search, Bell } from "lucide-react";

function Header({ search, setSearch, title }) {
  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        <p>Manage your work and track your progress.</p>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="header-avatar">S</div>
      </div>
    </header>
  );
}

export default Header;
