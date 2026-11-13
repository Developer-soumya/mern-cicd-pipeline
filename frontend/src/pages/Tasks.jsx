import { useEffect, useState } from "react";

import { Plus, Pencil, Trash2, X } from "lucide-react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const initialForm = {
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  };

  const [formData, setFormData] = useState(initialForm);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTasks();

      setTasks(response.data || []);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Load tasks when page opens
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open create form
  const openCreateForm = () => {
    setEditingId(null);
    setFormData(initialForm);
    setError("");
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (task) => {
    setEditingId(task._id);

    setFormData({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "Medium",
      status: task.status || "Pending",
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : "",
    });

    setError("");
    setShowForm(true);
  };

  // Create or update task
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Task title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,
        title: formData.title.trim(),
        dueDate: formData.dueDate || null,
      };

      if (editingId) {
        await updateTask(editingId, payload);
      } else {
        await createTask(payload);
      }

      setFormData(initialForm);
      setEditingId(null);
      setShowForm(false);

      await fetchTasks();
    } catch (error) {
      setError(error.response?.data?.message || "Unable to save task.");
    } finally {
      setSaving(false);
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteTask(taskId);

      await fetchTasks();
    } catch (error) {
      setError(error.response?.data?.message || "Unable to delete task.");
    }
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  // Filter tasks by status and search
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      (task.title || "").toLowerCase().includes(searchText) ||
      (task.description || "").toLowerCase().includes(searchText);

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="page-content">
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="task-toolbar">
        <div>
          <h2>All Tasks</h2>
          <p>Organize and manage your daily activities.</p>
        </div>

        <button className="primary-button" onClick={openCreateForm}>
          <Plus size={18} /> Create Task
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status filters */}
      <div className="filter-tabs">
        {["All", "Pending", "In Progress", "Completed"].map((status) => (
          <button
            key={status}
            className={
              statusFilter === status ? "filter-tab active" : "filter-tab"
            }
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="content-card form-card">
          <div className="section-heading">
            <div>
              <h3>{editingId !== null ? "Edit Task" : "Create New Task"}</h3>

              <p>Enter your task information below.</p>
            </div>

            <button
              className="icon-button"
              onClick={closeForm}
              aria-label="Close form"
              type="button"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
              <label>Task Title</label>

              <input
                type="text"
                name="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleChange}
                maxLength={150}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                placeholder="Describe your task"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Priority</label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Due Date</label>

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={closeForm}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                    ? "Update Task"
                    : "Save Task"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task List */}
      <div className="content-card">
        <div className="section-heading">
          <div>
            <h3>Task List</h3>
            <p>{filteredTasks.length} tasks found</p>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="empty-message">
            No tasks found. Create a new task to get started.
          </p>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => (
              <div className="task-row" key={task._id}>
                <div className="task-info">
                  <div className="task-bullet"></div>

                  <div>
                    <h4>{task.title}</h4>

                    <p>{task.description || "No description"}</p>

                    <span className="due-date">
                      Due:{" "}
                      {task.dueDate
                        ? task.dueDate.substring(0, 10)
                        : "Not specified"}
                    </span>
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

                  <button
                    className="action-button"
                    onClick={() => openEditForm(task)}
                    title="Edit task"
                    type="button"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    className="action-button delete-button"
                    onClick={() => handleDelete(task._id)}
                    title="Delete task"
                    type="button"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
