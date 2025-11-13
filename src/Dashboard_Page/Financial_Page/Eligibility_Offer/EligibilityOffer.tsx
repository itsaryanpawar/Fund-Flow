// src/EligibilityOffer.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, FileText, CheckCircle2, XCircle, Sparkles, Info } from 'lucide-react';
import { useProgress, STEPS } from '../Progress_Tracker/ProgressTracker';
import './EligibilityOffer.css';

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

const EligibilityOffer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { markComplete, isComplete } = useProgress();

  const applicationData = (location.state?.applicationData as ApplicationData) ?? {};

  // Step 4: "Eligibility & Offer"
  const currentStep = STEPS[3];

  // Mark step as complete when page loads (in case of refresh)
  useEffect(() => {
    if (!isComplete(currentStep)) {
      markComplete(currentStep);
    }
  }, [currentStep, isComplete, markComplete]);

  const handleAccept = () => {
    markComplete(currentStep); // Ensure it's marked
    navigate('/review-submit', { state: { applicationData } });
  };

  const handleReject = () => {
    navigate(-1);
  };

  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return '—';
    return `₹${parseInt(amount, 10).toLocaleString('en-IN')}`;
  };

  const monthlyEMI = (() => {
    const amount = parseFloat(applicationData.loanAmount || '500000');
    const rate = 10.5 / 100 / 12;
    const tenure = 36;
    const emi = (amount * rate * Math.pow(1 + rate, tenure)) /
                (Math.pow(1 + rate, tenure) - 1);
    return `₹${Math.round(emi).toLocaleString('en-IN')}`;
  })();

  return (
    <div className="eligibility-offer-container">
      <div className="eligibility-card-wrapper">
        {/* Main Card */}
        <div className="eligibility-card">
          {/* Header */}
          <header className="offer-header">
            <div className="header-content">
              <div className="header-icon">
                <TrendingUp size={32} />
              </div>
              <div className="header-text">
                <h1>Loan Eligibility Offer</h1>
                <p>Congratulations! You're pre-approved</p>
              </div>
            </div>
            <FileText size={28} className="header-doc-icon" />
          </header>

          {/* Celebration Badge */}
          <div className="badge-container">
            <div className="pre-approved-badge">
              <Sparkles size={18} />
              Pre-Approved Offer
              <Sparkles size={18} />
            </div>
          </div>

          {/* Offer Details */}
          <section className="offer-details">
            <div className="details-grid">
              {[
                { label: 'Applicant Name', value: applicationData.fullName || '—' },
                { label: 'Loan Type', value: applicationData.loanType || 'Personal Loan' },
                { label: 'Eligible Amount', value: formatCurrency(applicationData.loanAmount) || '₹5,00,000', highlight: true },
                { label: 'Interest Rate', value: '10.5% p.a.', highlight: true },
                { label: 'Tenure', value: '36 Months' },
                { label: 'Monthly EMI', value: monthlyEMI, highlight: true },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`detail-card ${item.highlight ? 'highlight' : ''}`}
                >
                  <p className="detail-label">{item.label}</p>
                  <p className="detail-value">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Info Box */}
          <section className="info-box">
            <div className="info-icon">
              <Info size={24} />
            </div>
            <div className="info-content">
              <h3>Great News!</h3>
              <p>
                Based on your profile and credit score, you've been <strong>pre-approved</strong> for this loan.
                Review the details above and accept to proceed with final submission.
              </p>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={handleAccept} className="btn-accept">
              <CheckCircle2 size={26} />
              Accept Offer
            </button>
            <button onClick={handleReject} className="btn-reject">
              <XCircle size={26} />
              Reject Offer
            </button>
          </div>

          {/* Footer Note */}
          <footer className="offer-footer">
            <p>
              By accepting, you agree to the loan terms and final verification. Offer valid for 48 hours.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default EligibilityOffer;