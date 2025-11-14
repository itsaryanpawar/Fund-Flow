import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, FileText, CheckCircle2, XCircle, Sparkles, Info } from 'lucide-react';
import { useProgress, STEPS } from '../Progress_Tracker/ProgressTracker';
import './EligibilityOffer.css';

interface ApplicationData {
  fullName?: string;
  dob?: string;
  mobile?: string;
  email?: string;
  loanType?: string;
  loanAmount?: string;
  loanPurpose?: string;
  monthlyIncome?: string;
  existingEMIs?: string;
  cibilScore?: string;
  // ... other fields
}

const EligibilityOffer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { markComplete, isComplete } = useProgress();

  const applicationData = (location.state?.applicationData as ApplicationData) ?? {};

  const currentStep = STEPS[3];

  useEffect(() => {
    if (!isComplete(currentStep)) {
      markComplete(currentStep);
    }
  }, [currentStep, isComplete, markComplete]);

  const handleReject = () => {
    navigate(-1);
  };

  const handleAccept = () => {
    // Calculate EMI properly before passing
    const principal = parseFloat(applicationData.loanAmount || '500000');
    const rate = 10.5 / 100 / 12; // monthly rate
    const tenure = 36;

    const emi = (principal * rate * Math.pow(1 + rate, tenure)) /
                (Math.pow(1 + rate, tenure) - 1);

    const offerData = {
      ...applicationData,
      eligibleAmount: principal.toString(),
      tenure: "36",
      interestRate: "10.5",
      emiAmount: Math.round(emi).toString(),
      creditScore: applicationData.cibilScore || "742",
    };

    // Navigate to DetailsStatus with full offer data
    navigate('/details-status', { 
      state: { applicationData: offerData } 
    });
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
        <div className="eligibility-card">
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

          <div className="badge-container">
            <div className="pre-approved-badge">
              <Sparkles size={18} /> Pre-Approved Offer <Sparkles size={18} />
            </div>
          </div>

          <section className="offer-details">
            <div className="details-grid">
              {[
                { label: 'Applicant Name', value: applicationData.fullName || '—' },
                { label: 'Loan Type', value: applicationData.loanType || 'Personal Loan' },
                { label: 'Eligible Amount', value: formatCurrency(applicationData.loanAmount), highlight: true },
                { label: 'Interest Rate', value: '10.5% p.a.', highlight: true },
                { label: 'Tenure', value: '36 Months' },
                { label: 'Monthly EMI', value: monthlyEMI, highlight: true },
              ].map((item, idx) => (
                <div key={idx} className={`detail-card ${item.highlight ? 'highlight' : ''}`}>
                  <p className="detail-label">{item.label}</p>
                  <p className="detail-value">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="info-box">
            <div className="info-icon"><Info size={24} /></div>
            <div className="info-content">
              <h3>Great News!</h3>
              <p>Based on your profile and credit score, you've been <strong>pre-approved</strong> for this loan.</p>
            </div>
          </section>

          <div className="action-buttons">
            <button onClick={handleAccept} className="btn-accept">
              <CheckCircle2 size={26} /> Accept Offer
            </button>
            <button onClick={handleReject} className="btn-reject">
              <XCircle size={26} /> Reject Offer
            </button>
          </div>

          <footer className="offer-footer">
            <p>By accepting, you agree to the loan terms and final verification. Offer valid for 48 hours.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default EligibilityOffer;