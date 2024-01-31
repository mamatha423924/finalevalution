import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './analitics.css';
import shareImage from '../image/share.jpg';
import deleteImage from '../image/delete.jpg';
import editImage from '../image/edit.jpg';
import DeleteQuizModal from './model/DeleteQuizModal';
import CreateQuizModal from './model/CreateQuizModal';
import QuestionAnalysisModal from './model/QuestionAnalysisModal';

const Analitic = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCreateQuizModalOpen, setCreateQuizModalOpen] = useState(false);
  const [isQuestionAnalysisModalOpen, setQuestionAnalysisModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  // Assuming you have a list of quizzes stored in state
  const [quizzes, setQuizzes] = useState([
    { quizId: 1, name: "Quiz 1", createdOn: "Jan 1, 2024", impression: 100 },
    { quizId: 2, name: "Quiz 2", createdOn: "Jan 2, 2024", impression: 200 },
    { quizId: 3, name: "Quiz 3", createdOn: "Jan 3, 2024", impression: 300 },
    { quizId: 4, name: "Quiz 4", createdOn: "Jan 1, 2024", impression: 100 },
    { quizId: 5, name: "Quiz 5", createdOn: "Jan 2, 2024", impression: 200 },
    { quizId: 6, name: "Quiz 6", createdOn: "Jan 3, 2024", impression: 300 },
  ]);

  const handleCopyToClipboard = () => {
    const urlToCopy = window.location.href;
    navigator.clipboard.writeText(urlToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    });
  };

  const handleCreateQuiz = () => {
    setCreateQuizModalOpen(true);
  };

  const handleCloseCreateQuizModal = () => {
    setCreateQuizModalOpen(false);
  };

  const handleOpenDeleteModal = (quizId) => { // Modified to capture quizId
    setDeleteModalOpen(true);
    setSelectedQuizId(quizId);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteQuiz = () => {
    const updatedQuizzes = quizzes.filter(quiz => quiz.quizId !== selectedQuizId); // Adjusted filter logic
    setQuizzes(updatedQuizzes);
    handleCloseDeleteModal();
  };

  const handleOpenQuestionAnalysisModal = () => {
    setQuestionAnalysisModalOpen(true);
  };

  const handleCloseQuestionAnalysisModal = () => {
    setQuestionAnalysisModalOpen(false);
  };

  return (
   
      <div>
      <div className="menucard">
      <div className="menu">
      <h1 className="header">QUIZIEE</h1>
      <div className="menuitem">
      <div className="board"><Link to="/dashboard"><button type="button">dashboard</button></Link></div>
        <div className="board"><Link to="/analitics"><button type="button">Analitics</button></Link></div>
        <div className="board">
              <button  type="button" onClick={handleCreateQuiz}>Create Quiz</button >
            
          </div>
        </div>
        <div className="logoutcard"><Link to="/"><button type="button">Logout</button></Link></div>
        </div>
        </div>

      <div className="dashboards">
        <h1>Quiz Analysis</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>sl no</th>
                <th>Quiz name</th>
                <th>Created on</th>
                <th>Impression</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Share</th>
                <th>Analysis</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.createdOn}</td>
                  <td>{quiz.impression}</td>
                  <td>
                    <button className="msgbutton" type="button">
                      <img src={editImage} alt="edit" />
                    </button>
                  </td>
                  <td>
                    <button className="msgbutton" type="button" onClick={() => handleOpenDeleteModal(quiz.quizId)}>
                      <img src={deleteImage} alt="delete" />
                    </button>
                  </td>
                  <td>
                    <button className="msgbutton" type="button" onClick={handleCopyToClipboard}>
                      <img src={shareImage} alt="share" />
                    </button>
                  </td>
                  <td>
                    <button className="msgbutton" type="button" onClick={handleOpenQuestionAnalysisModal}>
                      Question Analysis
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {copySuccess && <div className="alert">Link copied to clipboard!</div>}
      </div>

      {isQuestionAnalysisModalOpen && (
        <QuestionAnalysisModal onClose={handleCloseQuestionAnalysisModal} />
      )}

      {isDeleteModalOpen && (
        <DeleteQuizModal
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteQuiz}
        />
      )}

      {isCreateQuizModalOpen && <CreateQuizModal onClose={handleCloseCreateQuizModal} />}
    </div>
  );
};

export default Analitic;
