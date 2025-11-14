// src/Dashboard_Page/Dashboard.tsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import Sidebar from './Sidebar';
import CRM from './CRM';
import AIM from './AIM';
import Master from './Master';
import Product from './Product';
import Entity from './Entity';
import MemberEnrollment from './MemberEnrollment';
import Underwriting from './Underwriting';
import Acknowledgement from './Acknowledgement';
import Profile from './Profile';
import Endorsement from './Endorsement';
import Claims from './Claims';
import Fund from './Fund';
import Reports from './Reports';
import Reinsurance from './Reinsurance';
import FinancialInfo from './Financial_Page/FinancialInfo';
import { ProgressProvider } from './Financial_Page/Progress_Tracker/ProgressTracker';
import EligibilityOffer from './Financial_Page/Eligibility_Offer/EligibilityOffer';
import {
  Home as HomeIcon,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';

import './Dashboard.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="dashboard-title">
          <HomeIcon className="icon-home" size={28} />
          Loan System Dashboard
        </h1>
        <p className="welcome-text">
          Welcome back, <strong>Saroj Thombre</strong>!
          <span className="current-time">Today is November 07, 2025 | 12:52 PM IST</span>
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="icon-wrapper"><FileText size={24} /></div>
          <div className="stat-info">
            <h3>Total Loans</h3>
            <p className="value">1,284</p>
            <p className="trend up">+12% from last month</p>
          </div>
        </div>

        <div className="stat-card active">
          <div className="icon-wrapper"><TrendingUp size={24} /></div>
          <div className="stat-info">
            <h3>Active Loans</h3>
            <p className="value">892</p>
            <p className="trend up">+5% this week</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="icon-wrapper"><Clock size={24} /></div>
          <div className="stat-info">
            <h3>Pending Approval</h3>
            <p className="value">47</p>
            <p className="trend warn">Requires attention</p>
          </div>
        </div>

        <div className="stat-card overdue">
          <div className="icon-wrapper"><AlertCircle size={24} /></div>
          <div className="stat-info">
            <h3>Overdue Payments</h3>
            <p className="value">23</p>
            <p className="trend danger">2 critical</p>
          </div>
        </div>
      </div>

      <div className="main-row">
        <div className="recent-loans-panel">
          <div className="panel-header">
            <h2>Recent Loan Applications</h2>
            <button className="view-all">View All</button>
          </div>
          <div className="table-wrapper">
            <table className="loans-table">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Applicant</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>LN-2025-1087</strong></td>
                  <td>Rahul Sharma</td>
                  <td>₹5,00,000</td>
                  <td><span className="status approved">Approved</span></td>
                  <td>07 Nov 2025</td>
                </tr>
                <tr>
                  <td><strong>LN-2025-1086</strong></td>
                  <td>Priya Patel</td>
                  <td>₹3,20,000</td>
                  <td><span className="status pending">Pending</span></td>
                  <td>06 Nov 2025</td>
                </tr>
                <tr>
                  <td><strong>LN-2025-1085</strong></td>
                  <td>Amit Kumar</td>
                  <td>₹7,50,000</td>
                  <td><span className="status review">Under Review</span></td>
                  <td>06 Nov 2025</td>
                </tr>
                <tr>
                  <td><strong>LN-2025-1084</strong></td>
                  <td>Neha Singh</td>
                  <td>₹2,10,000</td>
                  <td><span className="status approved">Approved</span></td>
                  <td>05 Nov 2025</td>
                </tr>
                <tr>
                  <td><strong>LN-2025-1083</strong></td>
                  <td>Vikram Mehta</td>
                  <td>₹4,80,000</td>
                  <td><span className="status rejected">Rejected</span></td>
                  <td>05 Nov 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="chart-panel">
          <div className="panel-header"><h2>Loan Status Overview</h2></div>
          <div className="chart-bars">
            <div className="bar approved" style={{ height: '70%' }}></div>
            <div className="bar pending" style={{ height: '20%' }}></div>
            <div className="bar review" style={{ height: '8%' }}></div>
            <div className="bar rejected" style={{ height: '2%' }}></div>
          </div>
          <div className="legend">
            <div className="legend-item"><span className="dot approved"></span> Approved (70%)</div>
            <div className="legend-item"><span className="dot pending"></span> Pending (20%)</div>
            <div className="legend-item"><span className="dot review"></span> Under Review (8%)</div>
            <div className="legend-item"><span className="dot rejected"></span> Rejected (2%)</div>
          </div>
        </div>
      </div>

      <div className="quick-actions-panel">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-button"><Users size={20} /><span>New Loan Application</span></button>
          <button className="action-button"><DollarSign size={20} /><span>Disburse Loan</span></button>
          <button className="action-button"><FileText size={20} /><span>Generate Report</span></button>
          <button className="action-button"><CheckCircle size={20} /><span>Approve Pending</span></button>
        </div>
      </div>
    </div>
    

  );
};

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard-layout">
      <button
        className="mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? 'Close' : 'Open'}
      </button>
      

      <Sidebar isOpen={sidebarOpen} />

      <div className="main-wrapper">
        <header className="top-header">
          <div className="user-details">
            <span className="username">saroj thombre | Policy System Admin</span>
            <span className="last-login">Last Login: 07/07/2024 10:52:21</span>
          </div>
          <button className="logout-btn">Logout</button>
        </header>

        <main className="page-area">
          <Routes>
            <Route path="/" element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="crm" element={<CRM />} />
            <Route path="aim" element={<AIM />} />
            <Route path="master" element={<Master />} />
            <Route path="product" element={<Product />} />
            <Route path="entity" element={<Entity />} />
            <Route path="member-enrollment" element={<MemberEnrollment />} />
            <Route path="underwriting" element={<Underwriting />} />
            <Route path="acknowledgement" element={<Acknowledgement />} />
            <Route path="profile" element={<Profile />} />
            <Route path="financial" element={<FinancialInfo />} />
            <Route path="endorsement" element={<Endorsement />} />
            <Route path="claims" element={<Claims />} />
            <Route path="fund" element={<Fund />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reinsurance" element={<Reinsurance />} />
            <Route path="*" element={<div className="not-found">Page Not Found</div>} />
            <Route path="/eligibility-offer" element={<EligibilityOffer />} />

            <Route
  path="financialinfo"
  element={
    <ProgressProvider>
      <FinancialInfo />
    </ProgressProvider>
  }
/>
          </Routes>
        </main>

        <footer className="bottom-footer">
          Copyright © FUND FLOW  LOAN All Rights Reserved | Version 1.0.0.1
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
