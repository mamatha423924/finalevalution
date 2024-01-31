// CreateQuizModal.js

import React, { useState } from 'react';
import './CreateQuizModal.css';  // Import the CSS file
import CreateQuestionModal from './CreateQuestionModal';
import CreatePollModal from './CreatePollModal'; // Import the Poll modal component

const CreateQuizModal = ({ onClose }) => {
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('');
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuizTypeChange = (e) => {
    setQuizType(e.target.value);
  };

  const handleCreateQuiz = () => {
    if (!quizName.trim() || !quizType.trim()) {
      alert('Please fill out all fields before continuing.');
      return;
    }

    if (quizType === 'Q&A') {
      setShowQuestionModal(true);
    } else if (quizType === 'Poll') {
      setShowPollModal(true);
    }
  };

  const handleCloseQuestionModal = () => {
    setShowQuestionModal(false);
  };

  const handleClosePollModal = () => {
    setShowPollModal(false);
  };

  return (
    <div className="modals">
      <div className="modals-content">
        <input
          className="inputflied"
          type="text"
          id="quizName"
          placeholder="quiz name"
          value={quizName}
          onChange={handleQuizNameChange}
        />
        <div className="quiz">
          <label className="quizlabel">Quiz Type</label>
          <button
            className={`quiztype ${quizType === 'Q&A' ? 'green' : ''}`}
            value="Q&A"
            onClick={handleQuizTypeChange}
          >
            Q&A
          </button>
          <button
            className={`quiztype ${quizType === 'Poll' ? 'green' : ''}`}
            value="Poll"
            onClick={handleQuizTypeChange}
          >
            Poll
          </button>
        </div>

        <div>
          <button className="button-container" onClick={onClose}>
            Cancel
          </button>
          <button className="continue" onClick={handleCreateQuiz}>
            Continue
          </button>
        </div>
      </div>
      {showQuestionModal && (
        <CreateQuestionModal
          onClose={handleCloseQuestionModal}
          onContinue={onClose}  // Adjust the onContinue prop accordingly
        />
      )}
      {showPollModal && (
        <CreatePollModal
          onClose={handleClosePollModal}
          onContinue={onClose}  // Adjust the onContinue prop accordingly
        />
      )}
    </div>
  );
};

export default CreateQuizModal;
