// src/App.tsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import Login from "./Login_Page/Login";
import Dashboard from "./Dashboard_Page/Dashboard";
import { ProgressProvider } from "./Dashboard_Page/Financial_Page/Progress_Tracker/ProgressTracker";
import FinancialInfo from "./Dashboard_Page/Financial_Page/FinancialInfo";
import ApplicationForm from "./Dashboard_Page/Financial_Page/Application_Form/ApplicationForm";
import DocumentUpload from "./Dashboard_Page/Financial_Page/Document_Upload/DocumentUpload";
import EligibilityOffer from "./Dashboard_Page/Financial_Page/Eligibility_Offer/EligibilityOffer";
import DetailsStatus from "./Dashboard_Page/Financial_Page/Detailes_status/Detailesstatus";

const App: React.FC = () => {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. All public / application flow pages */}
          <Route
            path="/*"
            element={
              <>
                <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg sticky top-0 z-50">
                  <div className="max-w-6xl mx-auto flex gap-6 text-sm font-medium">
                    <Link to="/" className="hover:underline">Login</Link>
                    <Link to="/financial-info" className="hover:underline">Financial Info</Link>
                    <Link to="/application" className="hover:underline">Application</Link>
                    <Link to="/document-upload" className="hover:underline opacity-70">Documents</Link>
                    <Link to="/eligibility-offer" className="hover:underline opacity-70">Offer</Link>
                  </div>
                </nav>

                <main className="min-h-screen bg-gray-50">
                  <div className="max-w-5xl mx-auto p-4">
                    <Routes>
                      <Route path="/" element={<Login />} />
                      <Route path="/financial-info" element={<FinancialInfo />} />
                      <Route path="/application" element={<ApplicationForm />} />
                      <Route path="/document-upload" element={<DocumentUpload />} />
                      <Route path="/eligibility-offer" element={<EligibilityOffer />} />
                      <Route path="/details-status" element={<DetailsStatus />} />

                      {/* Success page */}
                      <Route
                        path="/success"
                        element={
                          <div className="text-center py-20">
                            <h1 className="text-4xl font-bold text-green-600 mb-4">
                              Application Submitted!
                            </h1>
                            <p className="text-gray-700 mb-8">We’ll get back to you soon.</p>
                            <Link
                              to="/dashboard/home"
                              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
                            >
                              Go to Dashboard
                            </Link>
                          </div>
                        }
                      />

                      {/* Catch-all */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </div>
                </main>
              </>
            }
          />

          {/* 2. Dashboard route */}
          <Route path="/dashboard/*" element={<Dashboard />} />

          {/* ❌ Removed the wrong redirect */}
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
};

export default App;
