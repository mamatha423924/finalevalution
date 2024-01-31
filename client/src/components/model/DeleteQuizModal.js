import React from 'react';
import './DeleteQuizModal.css';

const DeleteQuizModal = ({ onClose, onDelete, quizId }) => {
  return (
    <div className="modals">
      <div className="modals-content">
        <h2>Are you sure you want to delete this quiz?</h2>
        <button className="deletebutton" onClick={() => onDelete(quizId)}>Delete</button>
        <button className="deletebutton" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteQuizModal;
