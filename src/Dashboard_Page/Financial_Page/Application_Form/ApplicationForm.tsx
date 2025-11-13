// src/Dashboard_Page/Application_Form/ApplicationForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationForm.css';
import { ProgressBar, useProgress, STEPS } from '../Progress_Tracker/ProgressTracker';
import { format } from 'date-fns';
import {
  User, Briefcase, Building2, Calendar, DollarSign, CreditCard,
  Home, FileText, Lock, ChevronRight, ChevronLeft, Banknote
} from 'lucide-react';

interface FormData {
  // Employment
  occupationType: string;
  organizationName: string;
  designation: string;
  workExperience: string;
  monthlyIncome: string;
  // Financial
  panNumber: string;
  existingEMIs: string;
  totalMonthlyObligations: string;
  netMonthlySavings: string;
  cibilScore: string;
  // Bank
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  // Loan
  loanType: string;
  loanAmount: string;
  loanPurpose: string;
}

const loanTypes = [
  { value: 'personal', label: 'Personal Loan' },
  { value: 'home', label: 'Home Loan' },
  { value: 'car', label: 'Car Loan' },
  { value: 'education', label: 'Education Loan' },
  { value: 'business', label: 'Business Loan' },
];

const occupationTypes = [
  { value: 'salaried', label: 'Salaried' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'business', label: 'Business Owner' },
  { value: 'professional', label: 'Professional (Doctor, CA, etc.)' },
];

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { markComplete } = useProgress();

  const [now, setNow] = useState(new Date());
  const [formData, setFormData] = useState<FormData>({
    occupationType: '',
    organizationName: '',
    designation: '',
    workExperience: '',
    monthlyIncome: '',
    panNumber: '',
    existingEMIs: '',
    totalMonthlyObligations: '',
    netMonthlySavings: '',
    cibilScore: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    loanType: '',
    loanAmount: '',
    loanPurpose: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // live IST clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(p => ({ ...p, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};

    // Employment
    if (!formData.occupationType) e.occupationType = 'Required';
    if (!formData.organizationName.trim()) e.organizationName = 'Required';
    if (!formData.designation.trim()) e.designation = 'Required';
    if (!formData.workExperience || +formData.workExperience < 0) e.workExperience = 'Valid years required';
    if (!formData.monthlyIncome || +formData.monthlyIncome <= 0) e.monthlyIncome = 'Income > 0';

    // Financial
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.panNumber)) e.panNumber = 'Invalid PAN (e.g. ABCDE1234F)';
    if (+formData.cibilScore < 300 || +formData.cibilScore > 900) e.cibilScore = '300–900';

    // Bank
    if (!formData.bankName.trim()) e.bankName = 'Required';
    if (!/^\d{9,18}$/.test(formData.accountNumber)) e.accountNumber = 'Invalid account number';
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) e.ifscCode = 'Invalid IFSC (e.g. SBIN0001234)';

    // Loan
    if (!formData.loanType) e.loanType = 'Required';
    if (!formData.loanAmount || +formData.loanAmount <= 0) e.loanAmount = 'Amount > 0';
    if (!formData.loanPurpose.trim()) e.loanPurpose = 'Required';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show validation errors but **do NOT block** navigation
    validate();

    // Always mark step as complete and proceed
    markComplete(STEPS[1]);
    navigate('/document-upload', { state: { applicationData: formData } });
  };

  const timeStr = format(now, 'dd MMM yyyy, hh:mm:ss a');

  return (
    <div className="app-page">
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={18} /> Back
          </button>
          <div className="progress-wrapper">
            <ProgressBar />
          </div>
          <div className="time-badge">
            <Lock size={14} />
            <span>{timeStr} IST</span>
          </div>
        </header>

        {/* Main Card */}
        <section className="app-card">
          <div className="card-head">
            <h1>Detailed Information</h1>
            <p className="secure">
              <Lock size={15} /> Your data is secure & encrypted
            </p>
          </div>

          <form onSubmit={handleSubmit} className="app-form" noValidate>
            {/* Employment Details */}
            <section className="form-section">
              <h2><Briefcase size={20} /> Employment Details</h2>
              <div className="grid">
                <div className="input-group">
                  <label><User size={16} /> Occupation Type <span>*</span></label>
                  <select
                    name="occupationType"
                    value={formData.occupationType}
                    onChange={handleChange}
                    className={errors.occupationType ? 'error' : ''}
                  >
                    <option value="">Select</option>
                    {occupationTypes.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {errors.occupationType && <p className="err">{errors.occupationType}</p>}
                </div>

                <div className="input-group">
                  <label><Building2 size={16} /> Organization Name <span>*</span></label>
                  <input
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="e.g. Tata Consultancy"
                    className={errors.organizationName ? 'error' : ''}
                  />
                  {errors.organizationName && <p className="err">{errors.organizationName}</p>}
                </div>

                <div className="input-group">
                  <label><FileText size={16} /> Designation / Job Title <span>*</span></label>
                  <input
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                    className={errors.designation ? 'error' : ''}
                  />
                  {errors.designation && <p className="err">{errors.designation}</p>}
                </div>

                <div className="input-group">
                  <label><Calendar size={16} /> Work Experience (Years) <span>*</span></label>
                  <input
                    type="number"
                    name="workExperience"
                    value={formData.workExperience}
                    onChange={handleChange}
                    min="0"
                    placeholder="5"
                    className={errors.workExperience ? 'error' : ''}
                  />
                  {errors.workExperience && <p className="err">{errors.workExperience}</p>}
                </div>

                <div className="input-group">
                  <label><DollarSign size={16} /> Monthly Income <span>*</span></label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    min="1"
                    placeholder="75000"
                    className={errors.monthlyIncome ? 'error' : ''}
                  />
                  {errors.monthlyIncome && <p className="err">{errors.monthlyIncome}</p>}
                </div>
              </div>
            </section>

            {/* Financial Details */}
            <section className="form-section">
              <h2><Banknote size={20} /> Financial Details</h2>
              <div className="grid">
                <div className="input-group">
                  <label><FileText size={16} /> PAN Number <span>*</span></label>
                  <input
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    style={{ textTransform: 'uppercase' }}
                    className={errors.panNumber ? 'error' : ''}
                  />
                  {errors.panNumber && <p className="err">{errors.panNumber}</p>}
                </div>

                <div className="input-group">
                  <label>Existing EMIs (if any)</label>
                  <input
                    type="number"
                    name="existingEMIs"
                    value={formData.existingEMIs}
                    onChange={handleChange}
                    placeholder="15000"
                  />
                </div>

                <div className="input-group">
                  <label>Total Monthly Obligations</label>
                  <input
                    type="number"
                    name="totalMonthlyObligations"
                    value={formData.totalMonthlyObligations}
                    onChange={handleChange}
                    placeholder="25000"
                  />
                </div>

                <div className="input-group">
                  <label>Net Monthly Savings</label>
                  <input
                    type="number"
                    name="netMonthlySavings"
                    value={formData.netMonthlySavings}
                    onChange={handleChange}
                    placeholder="30000"
                  />
                </div>

                <div className="input-group">
                  <label>CIBIL Score <span>*</span></label>
                  <input
                    type="number"
                    name="cibilScore"
                    value={formData.cibilScore}
                    onChange={handleChange}
                    min="300"
                    max="900"
                    placeholder="750"
                    className={errors.cibilScore ? 'error' : ''}
                  />
                  {errors.cibilScore && <p className="err">{errors.cibilScore}</p>}
                </div>
              </div>
            </section>

            {/* Bank Details */}
            <section className="form-section">
              <h2><Building2 size={20} /> Bank Details</h2>
              <div className="grid">
                <div className="input-group">
                  <label><Building2 size={16} /> Bank Name <span>*</span></label>
                  <input
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="State Bank of India"
                    className={errors.bankName ? 'error' : ''}
                  />
                  {errors.bankName && <p className="err">{errors.bankName}</p>}
                </div>

                <div className="input-group">
                  <label>Account Number <span>*</span></label>
                  <input
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className={errors.accountNumber ? 'error' : ''}
                  />
                  {errors.accountNumber && <p className="err">{errors.accountNumber}</p>}
                </div>

                <div className="input-group">
                  <label>IFSC Code <span>*</span></label>
                  <input
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    placeholder="SBIN0001234"
                    maxLength={11}
                    style={{ textTransform: 'uppercase' }}
                    className={errors.ifscCode ? 'error' : ''}
                  />
                  {errors.ifscCode && <p className="err">{errors.ifscCode}</p>}
                </div>
              </div>
            </section>

            {/* Loan Details */}
            <section className="form-section">
              <h2><CreditCard size={20} /> Loan Details</h2>
              <div className="grid">
                <div className="input-group">
                  <label><FileText size={16} /> Loan Type <span>*</span></label>
                  <select
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    className={errors.loanType ? 'error' : ''}
                  >
                    <option value="">Select Loan Type</option>
                    {loanTypes.map(l => (
                      <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                  </select>
                  {errors.loanType && <p className="err">{errors.loanType}</p>}
                </div>

                <div className="input-group">
                  <label><DollarSign size={16} /> Loan Amount <span>*</span></label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    min="1"
                    placeholder="500000"
                    className={errors.loanAmount ? 'error' : ''}
                  />
                  {errors.loanAmount && <p className="err">{errors.loanAmount}</p>}
                </div>

                <div className="input-group">
                  <label><Home size={16} /> Loan Purpose <span>*</span></label>
                  <input
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleChange}
                    placeholder="e.g. Home Renovation"
                    className={errors.loanPurpose ? 'error' : ''}
                  />
                  {errors.loanPurpose && <p className="err">{errors.loanPurpose}</p>}
                </div>
              </div>
            </section>

            {/* Action */}
            <div className="action">
              <button type="submit" className="save-btn">
                Save & Continue <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ApplicationForm;