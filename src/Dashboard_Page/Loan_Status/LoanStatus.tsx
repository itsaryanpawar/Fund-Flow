import React, { useState } from "react";
import "./LoanStatus.css";

const LoanStatus: React.FC = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loanStatus, setLoanStatus] = useState("All");

  const data = [
    {
      id: 1,
      clientName: "Ravi Sharma",
      loanType: "Personal Loan",
      appliedAmount: "2,00,000",
      kycStatus: "KYC Complete",
      documentStatus: "Uploaded",
      applicationStatus: "Under Review",
      dateTime: "2025-11-14 10:20 AM",
      finalStatus: "Pending",
      reason: "N/A",
      updateTime: "2025-11-14 10:25 AM",
    },
    {
      id: 2,
      clientName: "Neha Singh",
      loanType: "Home Loan",
      appliedAmount: "25,00,000",
      kycStatus: "KYC Incomplete",
      documentStatus: "Pending",
      applicationStatus: "Draft",
      dateTime: "2025-11-12 04:15 PM",
      finalStatus: "Incomplete",
      reason: "User did not upload documents",
      updateTime: "2025-11-12 04:18 PM",
    },
  ];

  return (
    <div className="loan-status-page">

      {/* Filter Box */}
      <div className="filter-box">
        <div className="form-group">
          <label>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Loan Status</label>
          <select value={loanStatus} onChange={(e) => setLoanStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button className="search-btn">Search</button>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table-header">
          <span>Show</span>
          <select>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>entries</span>

          <div className="search-box">
            <span>Search:</span>
            <input type="text" />
          </div>
        </div>

        <table className="loan-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Client Name</th>
              <th>Loan Type</th>
              <th>Applied Amount</th>
              <th>KYC Status</th>
              <th>Document Status</th>
              <th>Application Status</th>
              <th>Date & Time</th>
              <th>Final Status</th>
              <th>Reason</th>
              <th>Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.clientName}</td>
                <td>{row.loanType}</td>
                <td>{row.appliedAmount}</td>
                <td>{row.kycStatus}</td>
                <td>{row.documentStatus}</td>
                <td>{row.applicationStatus}</td>
                <td>{row.dateTime}</td>
                <td>{row.finalStatus}</td>
                <td>{row.reason}</td>
                <td>{row.updateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanStatus;
