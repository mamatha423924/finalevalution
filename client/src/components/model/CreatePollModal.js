import React, {  useState } from 'react';
import deleteImage from '../../image/delete.jpg';
import './CreateQuestionModel.css';
import axios from 'axios'; 
import { Link,useNavigate } from 'react-router-dom';


const CreateQuestionModal = ({ onClose, onContinue }) => {
  const navigate = useNavigate();
  const initialQuestionData = {
    quizname:'',
    questionText: '',
    optionType: ' ',
    textOption1: '',
    textOption2: '',
    timer: '',
  };

  const [copySuccess, setCopySuccess] = useState(false);
  const [questionData, setQuestionData] = useState(initialQuestionData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [canAddQuestion, setCanAddQuestion] = useState(true);
  const [additionalOptions, setAdditionalOptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'quizname') { 
      setQuizName(value);
    }

    if (name === 'optionType' && value !== 'text') {
      setAdditionalOptions(['', '',]); 
    } else if (name === 'optionType' && value === 'text') {
      setAdditionalOptions([]); 
    }

    setQuestionData({ ...questionData, [name]: value });
  };

  const handleAddQuestion = () => {
    if (questions.length === 5) {
      setCanAddQuestion(false); // Disable adding more questions once the limit is reached
      return;
    }

    setCurrentQuestionNumber(currentQuestionNumber + 1); // Increment question number when adding a new question
    setQuestions([...questions, questionData]); // Add current question to the questions array
    setQuestionData(initialQuestionData); // Reset question fields
    setAdditionalOptions([]); // Reset additional options
  };

  const handleContinue = async () => {
    try {
      if (questions.length !== 5) {
        alert('Please add 5 questions before continuing.');
        return;
      }

      
      const requestData = {
        quizName: quizName,
        questions: questions
      };

      
      const response = await axios.post('https://quizzeappp.onrender.com/CreateQuestionModal', requestData);
      console.log('Questions data sent to the backend successfully:', response.data);

     
      setIsSuccess(true);
    } catch (error) {
      console.error('Error sending questions data to the backend:', error);
     
    }
  };

 

  const handleAddOption = () => {
    
    if (additionalOptions.length < 2) {
      const newOptions = additionalOptions.concat('');
      setAdditionalOptions(newOptions);
    }
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...additionalOptions];
    newOptions.splice(index, 1);
    setAdditionalOptions(newOptions);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {!isSuccess ? (
          <>
            <button className="numbutton">{currentQuestionNumber}</button>
            <button className="numbutton" onClick={handleAddQuestion} disabled={!canAddQuestion}>
              +
            </button>
            <input
              className="inputflied"
              type="text"
              name="quizname"
              placeholder="Poll name"
              value={quizName}
              onChange={handleInputChange}
            />

            <input
              className="inputflied"
              type="text"
              name="questionText"
              placeholder="pollQuestion"
              value={questionData.questionText}
              onChange={handleInputChange}
            />

      
            <div className="optioncard">
              <label className="quizoption">Option Type</label>
              <form className="radioform">
                <label>
                  <input
                    type="radio"
                    value="text"
                    name="optionType"
                    checked={questionData.optionType === 'text'}
                    onChange={handleInputChange}
                  />
                  text
                </label>

                <label>
                  <input
                    type="radio"
                    value="image"
                    name="optionType"
                    checked={questionData.optionType === 'image'}
                    onChange={handleInputChange}
                  />
                  Image url
                </label>

                <label>
                  <input
                    type="radio"
                    value="textAndImage"
                    name="optionType"
                    checked={questionData.optionType === 'textAndImage'}
                    onChange={handleInputChange}
                  />
                  Text & imageURL
                </label>
              </form>
            </div>

            {/* Additional fields and options */}
            <div className="quiztime">
              <div className="flied">
                <input
                  className="inputtext"
                  type="text"
                  id="textOption1"
                  name="textOption1"
                  placeholder="text 1"
                  value={questionData.textOption1}
                  onChange={handleInputChange}
                />
                <input
                  className="inputtext"
                  type="text"
                  id="textOption2"
                  name="textOption2"
                  placeholder="text 2"
                  value={questionData.textOption2}
                  onChange={handleInputChange}
                />
                {/* Render additional options */}
                {additionalOptions.map((option, index) => (
                  <div className=" adddel" key={index}>
                    <input
                      className="inputtext"
                      type="text"
                      placeholder={`text ${index +1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...additionalOptions];
                        newOptions[index] = e.target.value;
                        setAdditionalOptions(newOptions);
                      }}
                    />
                    <img
                      src={deleteImage}
                      alt="delete"
                      className="deleteIcon"
                      onClick={() => handleDeleteOption(index)}
                    />
                  </div>
                ))}
                <button className="option" onClick={handleAddOption}>
                  add option
                </button>
              </div>
              <div className="timer">
                Timer
                
                <button className="timebutton" onClick={() => handleInputChange({ target: { name: 'timer', value: 'off' } })}>
                  Off
                </button>
                <button className="timebutton" onClick={() => handleInputChange({ target: { name: 'timer', value: '30sec' } })}>
                  30sec
                </button>
                <button className="timebutton" onClick={() => handleInputChange({ target: { name: 'timer', value: '60sec' } })}>
                  60sec
                </button>
              </div>
            </div>

            <button className="button-container" onClick={onClose}>
              Cancel
            </button>
            <button className="continue" onClick={handleContinue}>
              Continue
            </button>
          </>
        ) : (
          <div className="final">
            <h1 className="h1">Congratulations! Your poll is published.</h1>
            <div>
            <button className="button-container" onClick={onClose}>
              Cancel
            </button>
            <div>
  <Link to="/quizpage"> 
    <button type="button" className="share">
      Share
    </button>
  </Link>
</div>
            </div>
            {copySuccess && <div className="link">Link copied to clipboard!</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuestionModal;
