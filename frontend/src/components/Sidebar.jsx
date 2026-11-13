
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  ListTodo,
  Settings,
  Code2,
  Boxes,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Boxes size={24} />
        </div>

        <div>
          <h2>DevOpsHub</h2>
          <span>Task Manager</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/tasks" className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
            <ListTodo size={19} />
            <span>My Tasks</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-note">
          <Code2 size={20} />
          <p>Build. Deploy. Monitor.</p>
        </div>

        <NavLink to="/settings" className="nav-link">
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>

        <div className="user-profile">
          <div className="avatar">S</div>
          <div>
            <strong>Developer</strong>
            <span>DevOps Engineer</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
