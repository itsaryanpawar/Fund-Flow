// src/components/DashboardHomeButton.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHomeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard/home');
    // Optional: scroll to top when landing
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={handleGoToDashboard}
      className="dashboard-home-button"
      style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 28px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(99, 102, 234, 0.3)',
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(99, 102, 234, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 234, 0.3)';
      }}
    >
      Dashboard Home
    </button>
  );
};

export default DashboardHomeButton;