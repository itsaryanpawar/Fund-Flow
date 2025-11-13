import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Progress Tracker
import { ProgressBar, useProgress } from "../Progress_Tracker/ProgressTracker";
// (or use relative: "../../../Progress_Tracker/ProgressTracker")

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import {
  Lock,
  ChevronLeft,
  Home,           // Dashboard icon
  User,
  Briefcase,
  Shield,
  Clock,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

import "./ReviewSubmit.css";

interface ApplicationData {
  fullName?: string;
  dob?: string;
  gender?: string;
  maritalStatus?: string;
  mobile?: string;
  email?: string;
  occupationType?: string;
  organizationName?: string;
  monthlyIncome?: string;
  existingEMIs?: string;
  panNumber?: string;
  cibilScore?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  loanType?: string;
  loanAmount?: string;
  loanPurpose?: string;
}

const ReviewSubmit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { markComplete } = useProgress();

  const applicationData = (location.state?.applicationData as ApplicationData) ?? {};

  // Live IST clock
  const [now, setNow] = useState(() => toZonedTime(new Date(), "Asia/Kolkata"));
  const [agreed, setAgreed] = useState(false);

  // Update clock every second
  useEffect(() => {
    const id = setInterval(() => {
      setNow(toZonedTime(new Date(), "Asia/Kolkata"));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Mark this step as complete
  useEffect(() => {
    markComplete("Review & Submit");
  }, [markComplete]);

  // Format INR
  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  const timeStr = format(now, "dd MMM yyyy, hh:mm:ss a");

  // Navigation Handlers
  const handleBack = () => {
    navigate("/eligibility-offer", { state: { applicationData } });
  };

  // FIXED: Now navigates to /dashboard
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleSubmit = () => {
    navigate("/application-status", { state: { applicationData } });
  };

  return (
    <div className="review-submit-container">
      <div className="review-card-wrapper">
        {/* Header */}
        <header className="review-header">
          <div className="header-left">
            <button onClick={handleBack} className="back-btn">
              <ChevronLeft size={18} /> Back
            </button>

            {/* Dashboard Button */}
            <button onClick={handleDashboard} className="dashboard-btn">
              <Home size={18} /> Dashboard
            </button>
          </div>

          <ProgressBar />

          <div className="time-lock">
            <Lock size={14} />
            <span>{timeStr} IST</span>
          </div>
        </header>

        {/* Main Card */}
        <div className="review-card">
          <div className="title-bar">
            <h1>
              <Shield size={24} /> Review & Submit Application
            </h1>
            <p>Final verification • 256-bit encrypted</p>
          </div>

          {/* Personal Details */}
          <section className="info-section personal">
            <h2>
              <User size={20} /> Personal Details
            </h2>
            <div className="info-grid">
              <div><strong>Full Name:</strong> {applicationData.fullName ?? "—"}</div>
              <div>
                <strong>DOB:</strong>{" "}
                {applicationData.dob
                  ? format(new Date(applicationData.dob), "dd MMM yyyy")
                  : "—"}
              </div>
              <div><strong>Gender:</strong> {applicationData.gender ?? "—"}</div>
              <div><strong>Marital:</strong> {applicationData.maritalStatus ?? "—"}</div>
              <div><strong>Mobile:</strong> {applicationData.mobile ?? "—"}</div>
              <div><strong>Email:</strong> {applicationData.email ?? "—"}</div>
            </div>
          </section>

          {/* Financial Details */}
          <section className="info-section financial">
            <h2>
              <Briefcase size={20} /> Financial Details
            </h2>
            <div className="info-grid">
              <div>
                <strong>Income:</strong>{" "}
                {applicationData.monthlyIncome
                  ? formatINR(parseInt(applicationData.monthlyIncome, 10) || 0)
                  : "—"}
              </div>
              <div>
                <strong>EMIs:</strong>{" "}
                {applicationData.existingEMIs
                  ? formatINR(parseInt(applicationData.existingEMIs, 10) || 0)
                  : "₹0"}
              </div>
              <div>
                <strong>PAN:</strong>{" "}
                <span className="pan-number">{applicationData.panNumber ?? "—"}</span>
              </div>
            </div>
          </section>

          {/* Loan Offer */}
          <section className="info-section offer">
            <h2>
              <TrendingUp size={20} /> Loan Offer
            </h2>
            <p className="offer-placeholder">
              Offer details will be displayed after eligibility calculation.
            </p>
          </section>

          {/* Agreement & Submit */}
          <section className="submit-section">
            <label className="agreement-checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="checkmark">
                <CheckCircle2 size={16} />
              </span>
              <span>I have reviewed all details and confirm accuracy.</span>
            </label>

            <button
              disabled={!agreed}
              onClick={handleSubmit}
              className={`submit-btn ${agreed ? "active" : "disabled"}`}
            >
              <Clock size={20} />
              Submit for Final Approval
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;