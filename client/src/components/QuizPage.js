import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './quizpage.css';
import { Link } from 'react-router-dom'; // Import Link from React Router

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Make a GET request to your Express backend
    axios.get("http://localhost:5000/questions")
      .then(response => {
        // Update the state with the fetched questions
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <h4>{question.questionText}</h4>
            <p>Option Type: {question.optionType}</p>
            <p>Text Option 1: {question.textOption1}</p>
            <p>Text Option 2: {question.textOption2}</p>
            <p>Timer: {question.timer}</p> 
          </li>
        ))}
      </ul>
      <div>
        <button>Next</button>
        <div>
          <Link to="/Congratulation"> 
            <button type="button" className="submit">
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
