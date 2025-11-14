// src/Dashboard_Page/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, Users, Target, Package, Building,
  UserCheck, Shield, CheckSquare, User, ScrollText ,
  DollarSign, FileSignature, AlertCircle,
  Wallet, BarChart3,  LogOut
} from 'lucide-react';
import './Dashboard.css';

interface SidebarProps { isOpen: boolean; }

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const items = [
    { to: '/Dashboard/home', label: 'Home', icon: Home },
    { to: '/Dashboard/crm', label: 'CRM', icon: Users },
    { to: '/Dashboard/financial', label: 'Loan Application Form', icon: DollarSign },
    { to: '/Dashboard/aim', label: 'AIM', icon: Target },
    { to: '/Dashboard/master', label: 'Master', icon: Package },
    { to: '/Dashboard/loan-status', label: 'Loan Status', icon: ScrollText },
    { to: '/Dashboard/product', label: 'Product', icon: Package },
    { to: '/Dashboard/entity', label: 'Entity', icon: Building },
    { to: '/Dashboard/member-enrollment', label: 'Member Enrollment', icon: UserCheck },
    { to: '/Dashboard/underwriting', label: 'Underwriting', icon: Shield },
    { to: '/Dashboard/acknowledgement', label: 'Acknowledgement', icon: CheckSquare },
    { to: '/Dashboard/profile', label: 'Profile', icon: User },

    // ✅ Updated Correct Path
    

    { to: '/Dashboard/endorsement', label: 'Endorsement', icon: FileSignature },
    { to: '/Dashboard/claims', label: 'Claims', icon: AlertCircle },
    { to: '/Dashboard/fund', label: 'Fund', icon: Wallet },
    { to: '/Dashboard/reports', label: 'Reports', icon: BarChart3 },
  
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="star"></div>
          {isOpen && <span> FUND FLOW </span>}
        </div>
      </div>

      <nav className="nav-menu">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={20} />
            {isOpen && <span className="link-text">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-link">
          <LogOut size={20} />
          {isOpen && <span className="link-text">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
