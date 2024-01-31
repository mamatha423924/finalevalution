import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Signup from './components/signup';
import Login from './components/login';
import Analitics from './components/analitics';
import QuizPage from './components/QuizPage';
import Congratulation from './components/Congratulation'; // Corrected import

import reportWebVitals from './reportWebVitals';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Lowercase "dashboard" */}
        <Route path="/analitics" element={<Analitics />} /> {/* Lowercase "analitics" */}
        <Route path="/congratulation" element={<Congratulation />} /> {/* Lowercase "congratulation" */}
        <Route path="/quizpage" element={<QuizPage />} /> {/* Component should be rendered directly, not through "component" prop */}
      </Routes>
    </Router>
  );
};

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;

reportWebVitals();
