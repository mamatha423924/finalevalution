import React, { useState } from 'react';
import './login.css';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      window.alert('Please fill in all fields');
      return;
    }
    
    console.log('Submitting form with data:', { email, password });
    try {
      const result = await axios.post('https://quizzeappp.onrender.com/login', { email, password });
      console.log('Login successful:', result.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error logging in:', err);
      if (err.response && err.response.status === 401) {
        window.alert('Incorrect email or password');
      } else {
        window.alert('An error occurred while logging in. Please try again later.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="card">
      <h1>QUIZIEE</h1>
      <div className="signupcard">
        <Link to="/"><button type="button">Signup</button></Link>
        <button>Login</button>
      </div>
      <div className="formcard">
        <form onSubmit={handleSubmit}>
          <label>
            Email:
          </label>
          <input type="email" name="email" value={email} onChange={handleChange} />
        
          <br />

          <label>
            Password:
          </label>
          <input type="password" name="password" value={password} onChange={handleChange} />
        
          <br />

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
