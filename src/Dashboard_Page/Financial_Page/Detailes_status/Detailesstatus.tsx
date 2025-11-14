import React, { useState } from "react";
import "./Detailesstatus.css";
import DashboardHomeButton from "../../../components/DashboardHomeButton";

interface FormData {
  loanType: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  loanAmount: string;
  purpose: string;
  employmentType: string;
  employerName: string;
  monthlyIncome: string;
  existingEMI: string;
  bankAccount: string;
  ifscCode: string;
  creditScore: string;
  eligibleAmount: string;
  tenure: string;
  emiAmount: string;
  interestRate: string;
}

const initialFormData: FormData = {
  loanType: "",
  name: "",
  phone: "",
  email: "",
  dob: "",
  loanAmount: "",
  purpose: "",
  employmentType: "",
  employerName: "",
  monthlyIncome: "",
  existingEMI: "0",
  bankAccount: "",
  ifscCode: "",
  creditScore: "742",
  eligibleAmount: "",
  tenure: "36",
  emiAmount: "",
  interestRate: "10.99",
};

export default function DetailsStatus() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateEMI = () => {
    const P = parseFloat(formData.loanAmount) || 0;
    const R = parseFloat(formData.interestRate) / 1200;
    const N = parseFloat(formData.tenure);
    if (P > 0 && R > 0 && N > 0) {
      const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setFormData({ ...formData, emiAmount: emi.toFixed(0) });
    }
  };

  const handleSubmit = () => {
    console.log("Loan Application Submitted:", formData);
    alert("Your loan application has been submitted successfully!");
  };

  const handleReset = () => {
    if (window.confirm("Reset all fields?")) {
      setFormData(initialFormData);
    }
  };

  return (
    <div className="loan-container">
      <div className="loan-card">
        <h1 className="title">Apply for Loan</h1>
        <p className="subtitle">Fill in your details below to get instant loan offers</p>

        <form onSubmit={(e) => e.preventDefault()} className="loan-form">

          {/* Section 1: Basic Info */}
          <section className="form-section">
            <h2>1. Basic Information</h2>
            <div className="grid">
              <div>
                <label>Loan Type <span className="required">*</span></label>
                <select name="loanType" value={formData.loanType} onChange={handleChange} required>
                  <option value="">Select Loan Type</option>
                  <option>Personal Loan</option>
                  <option>Home Loan</option>
                  <option>Vehicle Loan</option>
                  <option>Education Loan</option>
                  <option>Business Loan</option>
                </select>
              </div>
              <div>
                <label>Full Name <span className="required">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid">
              <div>
                <label>Phone Number <span className="required">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div>
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="grid">
              <div>
                <label>Date of Birth <span className="required">*</span></label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </div>
              <div>
                <label>Requested Loan Amount (₹) <span className="required">*</span></label>
                <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label>Purpose of Loan <span className="required">*</span></label>
              <textarea
                name="purpose"
                rows={3}
                value={formData.purpose}
                onChange={handleChange}
                placeholder="e.g., Home renovation, Medical emergency, Education..."
                required
              />
            </div>
          </section>

          {/* Section 2: Employment & Income */}
          <section className="form-section">
            <h2>2. Employment & Income Details</h2>
            <div className="grid">
              <div>
                <label>Employment Type <span className="required">*</span></label>
                <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>Salaried</option>
                  <option>Self-Employed</option>
                  <option>Business Owner</option>
                  <option>Retired</option>
                </select>
              </div>
              <div>
                <label>Employer / Company Name</label>
                <input type="text" name="employerName" value={formData.employerName} onChange={handleChange} />
              </div>
            </div>

            <div className="grid">
              <div>
                <label>Monthly Income (₹) <span className="required">*</span></label>
                <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} required />
              </div>
              <div>
                <label>Existing EMI (₹)</label>
                <input type="number" name="existingEMI" value={formData.existingEMI} onChange={handleChange} placeholder="0 if none" />
              </div>
            </div>
          </section>

          {/* Section 3: Bank Details */}
          <section className="form-section">
            <h2>3. Bank Account Details</h2>
            <div className="grid">
              <div>
                <label>Bank Account Number <span className="required">*</span></label>
                <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} required />
              </div>
              <div>
                <label>IFSC Code <span className="required">*</span></label>
                <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required />
              </div>
            </div>
          </section>

          {/* Section 4: Loan Offer Preview */}
          <section className="form-section offer-preview">
            <h2>4. Your Personalized Loan Offer</h2>
            <div className="offer-box">
              <div className="offer-grid">
                <div><strong>Credit Score:</strong> {formData.creditScore || "N/A"}</div>
                <div><strong>Eligible Amount:</strong> ₹{formData.loanAmount || "0"}</div>
                <div><strong>Tenure:</strong> {formData.tenure} months</div>
                <div><strong>Interest Rate:</strong> {formData.interestRate}% p.a.</div>
                <div className="emi-big">
                  <strong>Monthly EMI:</strong> ₹{formData.emiAmount || "0"}
                </div>
              </div>
              {formData.loanAmount && !formData.emiAmount && (
                <button type="button" className="btn-calculate" onClick={calculateEMI}>
                  Calculate EMI
                </button>
              )}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button type="button" className="btn-reset" onClick={handleReset}>
              Reset Form
            </button>
            <button type="button" className="btn-submit" onClick={handleSubmit}>
              Submit Application
            </button>

                      {/* Dashboard BUtton Call  */}
              <div>
                
                <DashboardHomeButton />  {/* That's it! */}
              </div>
          
          </div>
        </form>
      </div>
    </div>
  );
}