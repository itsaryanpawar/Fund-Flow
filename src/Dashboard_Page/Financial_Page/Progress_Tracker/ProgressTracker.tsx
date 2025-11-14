// src/Dashboard_Page/Progress_Tracker/ProgressTracker.tsx
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import './ProgressTracker.css';
import { Check } from 'lucide-react';

export const STEPS = [
  'Loan Selection & Basic Details',
  'Detailed Information',
  'KYC & Document Verification',
  'Eligibility & Offer',
  'Application Submit'
] as const;


type Step = typeof STEPS[number];

interface ProgressContextType {
  completedSteps: Set<Step>;
  markComplete: (step: Step) => void;
  isComplete: (step: Step) => boolean;
  getProgressPercentage: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set());

  const markComplete = (step: Step) => {
    setCompletedSteps(prev => new Set(prev).add(step));
  };

  const isComplete = (step: Step) => completedSteps.has(step);

  const getProgressPercentage = () =>
    Math.round((completedSteps.size / STEPS.length) * 100);

  return (
    <ProgressContext.Provider
      value={{ completedSteps, markComplete, isComplete, getProgressPercentage }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};

export const ProgressBar: React.FC = () => {
  const { isComplete, getProgressPercentage, completedSteps } = useProgress();
  const percentage = getProgressPercentage();

  return (
    <div className="progress-tracker">
      {/* Header */}
      <div className="progress-header">
        <h3 className="progress-title">Application Progress</h3>
        <div className="progress-stats">
          <span className="progress-percentage">{percentage}%</span>
          <span className="progress-fraction">
            {completedSteps.size} / {STEPS.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Steps */}
      <div className="progress-steps">
        {STEPS.map((step, index) => {
          const completed = isComplete(step);
          const isCurrent = completedSteps.size === index;
          const isFuture = completedSteps.size < index;

          return (
            <div
              key={step}
              className={`progress-step ${completed ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isFuture ? 'future' : ''}`}
            >
              <div className="step-indicator">
                {completed ? (
                  <Check size={16} className="check-icon" />
                ) : (
                  <span className="step-number">{index + 1}</span>
                )}
              </div>
              <div className="step-content">
                <div className="step-label">{step}</div>
                {isCurrent && <div className="current-pulse" />}
              </div>
              {index < STEPS.length - 1 && (
                <div className="step-connector">
                  <div className="connector-line" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};