import { useEffect, useState } from "react";

import {
  ListTodo,
  CheckCircle2,
  Clock3,
  Activity,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router";

import StatCard from "../components/StatCard";
import { getTasks } from "../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTasks();

        setTasks(response.data || []);
      } catch (error) {
        setError(
          error.response?.data?.message || "Unable to load dashboard tasks.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Calculate task statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  // Get latest four tasks
  const recentTasks = tasks.slice(0, 4);

  if (loading) {
    return (
      <div className="page-content">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="welcome-banner">
        <div>
          <span className="eyebrow">YOUR WORKSPACE</span>
          <h2>Welcome back, Developer! 👋</h2>
          <p>Here is an overview of your project activities.</p>
        </div>

        <Link to="/tasks" className="primary-button">
          Manage Tasks <ArrowRight size={17} />
        </Link>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="stats-grid">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          description="All tasks in workspace"
          color="blue"
          icon={<ListTodo size={21} />}
        />

        <StatCard
          title="Completed"
          value={completedTasks}
          description="Successfully completed"
          color="green"
          icon={<CheckCircle2 size={21} />}
        />

        <StatCard
          title="In Progress"
          value={inProgressTasks}
          description="Currently working"
          color="purple"
          icon={<Activity size={21} />}
        />

        <StatCard
          title="Pending"
          value={pendingTasks}
          description="Waiting to be started"
          color="orange"
          icon={<Clock3 size={21} />}
        />
      </div>

      <div className="content-card">
        <div className="section-heading">
          <div>
            <h3>Recent Tasks</h3>
            <p>Your latest activities</p>
          </div>

          <Link to="/tasks" className="text-link">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="task-list">
          {recentTasks.length === 0 ? (
            <p className="empty-message">No tasks available.</p>
          ) : (
            recentTasks.map((task) => (
              <div className="task-row" key={task._id}>
                <div className="task-info">
                  <div className="task-bullet"></div>

                  <div>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                  </div>
                </div>

                <div className="task-meta">
                  <span
                    className={`status-badge ${
                      task.status === "Completed"
                        ? "completed"
                        : task.status === "In Progress"
                          ? "in-progress"
                          : "pending"
                    }`}
                  >
                    {task.status}
                  </span>

                  <span className="priority-text">{task.priority}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
