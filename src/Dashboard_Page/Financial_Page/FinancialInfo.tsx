// src/Dashboard_Page/Financial_Page/FinancialInfo.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinancialInfo.css';
import { ProgressBar, useProgress, STEPS } from './Progress_Tracker/ProgressTracker';
import { format } from 'date-fns';
import {
  User, Calendar, Users, Heart, Phone, Mail, ChevronRight, Lock, ChevronLeft,
} from 'lucide-react';

// Extended form interface to include optional CIBIL score
interface Form {
  fullName: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  mobile: string;
  email: string;
  cibilScore?: string;        // optional field
}

const FinancialInfo: React.FC = () => {
  const navigate = useNavigate();
  const { markComplete } = useProgress();

  const [now, setNow] = useState(new Date());
  const [showIneligibleModal, setShowIneligibleModal] = useState(false);

  const [form, setForm] = useState<Form>({
    fullName: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    mobile: '',
    email: '',
    cibilScore: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  // Live IST clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof Form]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof Form, string>> = {};

    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.dob) e.dob = 'Date of birth is required';
    if (!form.gender) e.gender = 'Select gender';
    if (!form.maritalStatus) e.maritalStatus = 'Select marital status';
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = 'Enter a valid 10-digit mobile number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';

    // Optional CIBIL validation (only if user entered something)
    if (form.cibilScore) {
      const score = Number(form.cibilScore);
      if (isNaN(score) || score < 300 || score > 900) {
        e.cibilScore = 'CIBIL score must be between 300 and 900';
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Always validate (shows errors even if we later navigate)
    validate();

    // If user entered a CIBIL score and it's below 600 → block navigation & show modal
    if (form.cibilScore) {
      const score = Number(form.cibilScore);
      if (!isNaN(score) && score < 600) {
        setShowIneligibleModal(true);
        return; // stop navigation
      }
    }

    // Otherwise → everything is fine, proceed
    markComplete(STEPS[0]);
    navigate('/application');
  };

  const timeStr = format(now, 'dd MMM yyyy, hh:mm:ss a');

  return (
    <div className="info-page">
      <div className="info-container">
        {/* Header */}
        <header className="info-header">
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
        <section className="info-card">
          <div className="card-head">
            <h1>Personal & Contact Information</h1>
            <p className="secure">
              <Lock size={15} /> End-to-end encrypted
            </p>
          </div>

          <form onSubmit={handleSubmit} className="info-form" noValidate>
            {/* Personal Information */}
            <section className="form-section">
              <h2><User size={20} /> Personal Information</h2>
              <div className="grid">
                {/* Full Name */}
                <div className="input-group">
                  <label><User size={16} /> Full Name <span>*</span></label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ashok Kumar"
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <p className="err">{errors.fullName}</p>}
                </div>

                {/* DOB */}
                <div className="input-group">
                  <label><Calendar size={16} /> Date of Birth <span>*</span></label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    max={format(new Date(), 'yyyy-MM-dd')}
                    className={errors.dob ? 'error' : ''}
                  />
                  {errors.dob && <p className="err">{errors.dob}</p>}
                </div>

                {/* Gender */}
                <div className="input-group">
                  <label><Users size={16} /> Gender <span>*</span></label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={errors.gender ? 'error' : ''}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="err">{errors.gender}</p>}
                </div>

                {/* Marital Status */}
                <div className="input-group">
                  <label><Heart size={16} /> Marital Status <span>*</span></label>
                  <select
                    name="maritalStatus"
                    value={form.maritalStatus}
                    onChange={handleChange}
                    className={errors.maritalStatus ? 'error' : ''}
                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                  {errors.maritalStatus && <p className="err">{errors.maritalStatus}</p>}
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="form-section">
              <h2><Phone size={20} /> Contact Information</h2>
              <div className="grid">
                {/* Mobile */}
                <div className="input-group">
                  <label><Phone size={16} /> Mobile Number <span>*</span></label>
                  <div className="phone-wrapper">
                    <span className="prefix">+91</span>
                    <input
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="9876543210"
                      maxLength={10}
                      className={errors.mobile ? 'error' : ''}
                    />
                  </div>
                  {errors.mobile && <p className="err">{errors.mobile}</p>}
                </div>

                {/* Email */}
                <div className="input-group">
                  <label><Mail size={16} /> Email ID <span>*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <p className="err">{errors.email}</p>}
                </div>
              </div>
            </section>

            {/* CIBIL Score (Optional) */}
            <section className="form-section">
              <h2>CIBIL Score Check (Optional)</h2>
              <div className="grid">
                <div className="input-group">
                  <label>CIBIL Score (300–900)</label>
                  <input
                    type="number"
                    name="cibilScore"
                    value={form.cibilScore || ''}
                    onChange={handleChange}
                    placeholder="e.g. 720"
                    min="300"
                    max="900"
                    className={errors.cibilScore ? 'error' : ''}
                  />
                  {errors.cibilScore && <p className="err">{errors.cibilScore}</p>}
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="action">
              <button type="submit" className="next-btn">
                Next <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Ineligible Modal (simple example – style it as you wish) */}
      {showIneligibleModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Application Ineligible</h2>
            <p>
              Your reported CIBIL score is below 600. Unfortunately, we cannot process your application at this time.
            </p>
            <button onClick={() => setShowIneligibleModal(false)} className="next-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialInfo;