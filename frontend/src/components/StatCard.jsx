
function StatCard({ title, value, icon, color, description }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span>{title}</span>

        <div className={`stat-icon ${color}`}>
          {icon}
        </div>
      </div>

      <h2>{value}</h2>

      <p>{description}</p>
    </div>
  );
}

export default StatCard;
