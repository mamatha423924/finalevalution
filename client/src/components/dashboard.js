import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import eyesImage from '../image/eyes.jpg';
import CreateQuizModal from './model/CreateQuizModal';

const Dashboard = () => {
  const [isCreateQuizModalOpen, setCreateQuizModalOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // This effect can be used to fetch quizzes from the server if needed
    // For simplicity, let's assume we have a local state for quizzes
    const fetchedQuizzes = [
      { name: 'Gen', impressions: 15 },
      { name: 'Sci 2', impressions: 5 },
      { name: 'Lap 3', impressions: 1},
      { name: 'Math 4', impressions: 2 },
    ];

    setQuizzes(fetchedQuizzes);
  }, []);

  const handleCreateQuiz = () => {
    setCreateQuizModalOpen(true);
  };

  const handleCloseCreateQuizModal = () => {
    setCreateQuizModalOpen(false);
  };

  // Function to handle quiz submission
  const handleQuizSubmission = (submittedQuiz) => {
    // Add the submitted quiz to the existing quizzes array
    setQuizzes(prevQuizzes => [...prevQuizzes, submittedQuiz]);
    // Close the create quiz modal
    setCreateQuizModalOpen(false);
  };

  return (
    <div>
      <div className="menucard">
        <div className="menu">
          <h1 className="header">QUIZIEE</h1>
          <div className="menuitem">
            <button>Dashboard</button>
            <div className="board">
              <Link to="/analitics">
                <button type="button">Analytics</button>
              </Link>
            </div>
            <div className="board">
              <button type="button" onClick={handleCreateQuiz}>Create Quiz</button>
            </div>
          </div>
          <div className="logoutcard">
            <Link to="/">
              <button type="button">Logout</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="dashboard">
        <div className="quizcards">
          <div className="quizcard">
            <h1 className="number1">{quizzes.length}</h1>
            <p className="quizanswer">Quiz Created</p>
          </div>
          {/* Assuming you want to sum impressions of all quizzes */}
          <div className="quizcard">
            <h1 className="number2">{quizzes.reduce((total, quiz) => total + quiz.impressions, 0)}</h1>
            <p className="quizquestion">Question Created</p>
          </div>
          <div className="quizcard">
            <h1 className="number3">{quizzes.reduce((total, quiz) => total + quiz.impressions, 0)}</h1>
            <p className="quiztotal">Total Impressions</p>
          </div>
        </div>
        <div>
          <h1 className="heading">Trending Quizzes</h1>
          {quizzes.map((quiz, index) => (
            <button key={index} className="quizmenu">
              {quiz.name} {quiz.impressions} <img src={eyesImage} alt="Eyes" />
              <p className="quizline">Created on </p>
            </button>
          ))}
        </div>
      </div>
      
      {isCreateQuizModalOpen && 
        <CreateQuizModal 
          onClose={handleCloseCreateQuizModal} 
          onQuizSubmit={handleQuizSubmission} // Pass the submission handler
        />
      }
    </div>
  );
};

export default Dashboard;
