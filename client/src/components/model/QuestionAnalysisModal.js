import React from "react";
import './QuestionAnalysisModal.css';


const QuestionAnalytics = () => {
  const questionAnalyticsData = [
    {
      id: "1",
      questionTitle: "Q.1 Question place holder for analysis ? ",
      questionList: "60",
      answerdList: "38",
    },
    {
      id: "2",
      questionTitle: "Q.2 Question place holder for analysis ? ",
      questionList: "70",
      answerdList: "30",
    },
    {
      id: "3",
      questionTitle: "Q.3 Question place holder for analysis ? ",
      questionList: "25",
      answerdList: "14",
    },
    {
      id: "4",
      questionTitle: "Q.4 Question place holder for analysis ? ",
      questionList: "60",
      answerdList: "38",
    },
  ];
  return (
    <>
      <div className="question-analytics-contianer">
        <div className="main-question-title">
          <h1>Quiz 2 Question Analysis</h1>
          <div className="data">
            <p>Created on : 04 Sep, 2023</p>
            <p>Impressions : 667</p>
          </div>
        </div>
        <div className="question-box">
          <ul>
            {questionAnalyticsData.map((item) => {
              const { id, questionTitle, questionList, answerdList } = item;
              return (
                <li key={id}>
                  <h1 className="title">{questionTitle}</h1>
                  <div className="d-flex">
                    <div className="question-list-box">
                    <h1>{questionList}</h1>
                     <p className="people"> people Attempted the question</p>
                    </div>
                    <div className="question-list-box">
                      <h1>{answerdList}</h1>
                      <p>people Answered Correctly</p>
                    </div>
                    <div className="question-list-box">
                      <h1>{questionList - answerdList}</h1>
                      <p>people Answered Incorrectly</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default QuestionAnalytics;