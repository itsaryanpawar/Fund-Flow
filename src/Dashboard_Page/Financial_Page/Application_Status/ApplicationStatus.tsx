import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar, useProgress } from "../Progress_Tracker/ProgressTracker";
import { CheckCircle2, Clock, ArrowLeft } from "lucide-react";
import "./ApplicationStatus.css";

const ApplicationStatus: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("under_review");
  const { markComplete } = useProgress();

  useEffect(() => {
    // Mark Review & Submit as complete when user reaches status page
    markComplete("Review & Submit");

    // Simulate application review time
    const timer = setTimeout(() => {
      setStatus("approved");
      // ✅ Use correct name defined in your ProgressTracker type
      markComplete("Application Status / Tracking");
    }, 4000);

    return () => clearTimeout(timer);
  }, [markComplete]);

  return (
    <div className="application-status-container">
      {/* Header Section */}
      <header className="status-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={18} /> Back
        </button>
        <h1>Application Status</h1>
      </header>

      {/* Progress Bar */}
      <div className="progress-section">
        <ProgressBar />
      </div>

      {/* Status Card */}
      <div className="status-card">
        {status === "under_review" && (
          <div className="status-content review">
            <Clock size={40} />
            <h2>Your Application is Under Review</h2>
            <p>
              Our verification team is checking your details and documents.
              Please wait for confirmation.
            </p>
            <div className="loader"></div>
          </div>
        )}

        {status === "approved" && (
          <div className="status-content approved">
            <CheckCircle2 size={48} color="green" />
            <h2>🎉 Congratulations!</h2>
            <p>Your loan application has been successfully approved.</p>
            <button className="home-btn" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;
