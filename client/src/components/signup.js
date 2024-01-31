import React, { useState } from 'react';
import axios from 'axios'; 
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const  navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      window.alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      window.alert('Password and Confirm Password do not match');
      return;
    }
    
    console.log('Submitting form with data:', { name, email, password, confirmPassword });
    try {
      const result = await axios.post('https://quizzeappp.onrender.com/', { name, email, password, confirmPassword });
      console.log('Signup successful:', result.data);
      navigate('/login')
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="rigistercard">
    
      <h1>QUIZIEE</h1>
     
      <div className="signupcard">
          <button type="button">Sign Up</button>
         <div className="signupcard"><Link to="/login"><button type="button">Log in</button></Link></div> 
      </div>
      <div className="formcard">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            </label>
            <input type="text" name="name" value={name} onChange={handleChange} />
        
          <br />

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

          <label>
            Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
       
          <br />
          <button type="submit">Sign Up</button>
        </form>
        </div>
      </div>
  
  );
};

export default Signup;
