import React, { useState } from 'react';

function QuizTabs() {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div>
      <div className="nav nav-tabs">
        <button onClick={() => setActiveTab('details')}
                className={`nav-link text-primary fs-5 px-2 ${activeTab === 'details' ? "active" : ""}`}>
          Details
        </button>
        <button onClick={() => setActiveTab('questions')}
                className={`nav-link text-primary fs-5 px-2 ${activeTab === 'questions' ? "active" : ""}`}>
          Questions
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'details' && <div>Quiz Details Content</div>}
        {activeTab === 'questions' && <div>Quizzes Content</div>}
      </div>
    </div>
  );
}

export default QuizTabs;
