// src/Dashboard_Page/Document_Upload/DocumentUpload.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DocumentUpload.css';
import { ProgressBar, useProgress, STEPS } from '../Progress_Tracker/ProgressTracker';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import {
  Lock, ChevronLeft, ChevronRight, Upload, CheckCircle, XCircle,
  AlertCircle, FileText, Image, CreditCard, Home, User,
  ExternalLink, Shield
} from 'lucide-react';

interface DocumentFile {
  idProof: File | null;
  addressProof: File | null;
  incomeProof: File | null;
  photograph: File | null;
  signature: File | null;
  aadhaarXml?: File | null;
}

const DocumentUpload: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { markComplete } = useProgress();

  const applicationData = location.state?.applicationData;
  const panFromPrev = applicationData?.panNumber || 'Not Provided';

  const [now, setNow] = useState(new Date());
  const [files, setFiles] = useState<DocumentFile>({
    idProof: null,
    addressProof: null,
    incomeProof: null,
    photograph: null,
    signature: null,
    aadhaarXml: null,
  });
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [kycStatus, setKycStatus] = useState<'pending' | 'verifying' | 'verified' | 'failed'>('pending');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Live IST Clock
  useEffect(() => {
    const id = setInterval(() => {
      const istTime = toZonedTime(new Date(), 'Asia/Kolkata');
      setNow(istTime);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const documentTypes = [
    { key: 'idProof', label: 'ID Proof (Aadhaar, Voter ID, Passport)', accept: '.pdf,.jpg,.jpeg,.png', icon: CreditCard },
    { key: 'addressProof', label: 'Address Proof (Bill, Rent Agreement)', accept: '.pdf,.jpg,.jpeg,.png', icon: Home },
    { key: 'incomeProof', label: 'Income Proof (Salary Slip, ITR, Bank Stmt)', accept: '.pdf,.jpg,.jpeg,.png', icon: FileText },
    { key: 'photograph', label: 'Passport Size Photo', accept: '.jpg,.jpeg,.png', icon: Image },
    { key: 'signature', label: 'Signature', accept: '.jpg,.jpeg,.png', icon: User },
  ];

  const handleFileChange = (key: keyof DocumentFile, file: File | null) => {
    if (!file) return;

    const validTypes = documentTypes.find(d => d.key === key)?.accept.split(',') || [];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validTypes.includes(ext)) {
      setErrors(p => ({ ...p, [key]: `Invalid: ${validTypes.join(', ')}` }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(p => ({ ...p, [key]: 'Max 5MB' }));
      return;
    }

    setErrors(p => ({ ...p, [key]: '' }));
    setFiles(p => ({ ...p, [key]: file }));
  };

  const handleDrop = (e: React.DragEvent, key: keyof DocumentFile) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(key, file);
  };

  const validateAadhaar = () => {
    if (/^\d{12}$/.test(aadhaarNumber)) {
      setKycStatus('verifying');
      setTimeout(() => setKycStatus('verified'), 1500);
    } else {
      setKycStatus('failed');
    }
  };

  const handleDigiLocker = () => {
    alert('Redirecting to DigiLocker...');
    // window.open('https://digilocker.gov.in', '_blank');
  };

  const validateAll = () => {
    const missing: string[] = [];
    if (!aadhaarNumber && !files.aadhaarXml) missing.push('Aadhaar Number or XML');
    documentTypes.forEach(d => {
      if (!files[d.key as keyof DocumentFile]) missing.push(d.label);
    });
    return missing;
  };

  const handleSubmit = async () => {
    // Show missing items (but **do NOT block**)
    const missing = validateAll();
    if (missing.length > 0) {
      alert(`Missing:\n• ${missing.join('\n• ')}`);
      // Continue anyway
    }

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          markComplete(STEPS[2]);
          navigate('/eligibility-offer', { state: { applicationData } });
          return 100;
        }
        return p + 15;
      });
    }, 400);
  };

  const timeStr = format(now, 'dd MMM yyyy, hh:mm:ss a');

  return (
    <div className="doc-page">
      <div className="doc-container">
        {/* Header */}
        <header className="doc-header">
          <button className="back-btn" onClick={() => navigate(-1)} disabled={isUploading}>
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
        <section className="doc-card">
          <div className="card-head">
            <h1>KYC & Document Verification</h1>
            <p className="secure">
              <Shield size={16} /> End-to-end encrypted • 256-bit SSL
            </p>
          </div>

          <div className="doc-body">
            {/* KYC Section */}
            <section className="kyc-section">
              <h2><CreditCard size={20} /> KYC Verification</h2>
              <div className="kyc-grid">
                <div className="kyc-item">
                  <label>Aadhaar Number</label>
                  <div className="aadhaar-input">
                    <input
                      type="text"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      placeholder="1234 5678 9012"
                      maxLength={12}
                      onBlur={validateAadhaar}
                    />
                    <span className="format-hint">XXXX XXXX XXXX</span>
                  </div>
                  <p className="or-text">OR</p>
                  <div className="file-upload small">
                    <input
                      type="file"
                      accept=".xml"
                      onChange={(e) => handleFileChange('aadhaarXml', e.target.files?.[0] || null)}
                    />
                    <Upload size={16} /> Upload Aadhaar XML
                  </div>
                </div>

                <div className="kyc-item">
                  <label>PAN Number</label>
                  <div className="pan-display">
                    <strong>{panFromPrev}</strong>
                    <CheckCircle size={18} className="verified" />
                  </div>
                  <small>Auto-fetched from previous step</small>
                </div>

                <div className="kyc-item">
                  <button className="digilocker-btn" onClick={handleDigiLocker}>
                    <ExternalLink size={16} /> Fetch via DigiLocker
                  </button>
                </div>

                <div className="kyc-item status">
                  <label>KYC Status</label>
                  <div className={`status-badge ${kycStatus}`}>
                    {kycStatus === 'verified' && <><CheckCircle size={16} /> Verified</>}
                    {kycStatus === 'verifying' && <><AlertCircle size={16} /> Verifying...</>}
                    {kycStatus === 'failed' && <><XCircle size={16} /> Invalid Aadhaar</>}
                    {kycStatus === 'pending' && <><AlertCircle size={16} /> Enter Aadhaar</>}
                  </div>
                </div>
              </div>
            </section>

            {/* Document Uploads */}
            <section className="upload-section">
              <h2><Upload size={20} /> Document Uploads</h2>
              <div className="upload-grid">
                {documentTypes.map(doc => {
                  const Icon = doc.icon;
                  const hasFile = !!files[doc.key as keyof DocumentFile];
                  return (
                    <div key={doc.key} className="upload-item">
                      <label><Icon size={16} /> {doc.label}</label>
                      <div
                        className={`drop-zone ${hasFile ? 'has-file' : ''} ${errors[doc.key] ? 'error' : ''}`}
                        onDrop={(e) => handleDrop(e, doc.key as keyof DocumentFile)}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <input
                          type="file"
                          accept={doc.accept}
                          onChange={(e) => handleFileChange(doc.key as keyof DocumentFile, e.target.files?.[0] || null)}
                        />
                        {hasFile ? (
                          <div className="file-info">
                            <CheckCircle size={18} className="check" />
                            <span>{files[doc.key as keyof DocumentFile]!.name}</span>
                            <button
                              className="remove"
                              onClick={() => setFiles(p => ({ ...p, [doc.key as keyof DocumentFile]: null }))}
                            >×</button>
                          </div>
                        ) : (
                          <div className="drop-hint">
                            <Upload size={24} />
                            <p>Drop file here</p>
                            <p>or <strong>click to browse</strong></p>
                            <small>Max 5MB • {doc.accept}</small>
                          </div>
                        )}
                      </div>
                      {errors[doc.key] && <p className="err">{errors[doc.key]}</p>}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Upload Progress */}
            {isUploading && (
              <div className="progress-section">
                <div className="progress-bar">
                  <div className="fill" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p>Uploading documents... {uploadProgress}%</p>
              </div>
            )}

            {/* Action */}
            <div className="action">
              <button
                className="save-btn"
                onClick={handleSubmit}
                disabled={isUploading}
              >
                {isUploading ? 'Saving...' : 'Save & Continue'} <ChevronRight size={18} />
              </button>
            </div>
          
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocumentUpload;