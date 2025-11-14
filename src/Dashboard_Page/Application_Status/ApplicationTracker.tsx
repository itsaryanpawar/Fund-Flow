import "./ApplicationTracker.css";

const applications = [
  { id: 1, title: "Senior React Developer", company: "TechCorp", appliedDate: "2025-10-15", status: "Interview" },
  { id: 2, title: "Full Stack Engineer", company: "StartupXYZ", appliedDate: "2025-11-01", status: "Review" },
  { id: 3, title: "Frontend Developer", company: "BigBank Inc", appliedDate: "2025-10-28", status: "Pending" },
];

const ApplicationTracker = () => {
  return (
    <div className="application-tracker">
      <h1>Application Tracker</h1>

      <div className="tracker-grid">
        {applications.map((app) => (
          <div key={app.id} className="card">
            <h3>{app.title}</h3>
            <p><strong>Company:</strong> {app.company}</p>
            <p><strong>Applied:</strong> {app.appliedDate}</p>
            <span className="status">{app.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTracker;
