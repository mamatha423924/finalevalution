import React from 'react';
import './Congratulation.css';
import cupImage from '../image/cup.jpg';
const Congratulation = () => {
  return (
    <div>
      <h1 className="congrates">Congratulations quiz is complted</h1>
      <div className="cup"> <img src={cupImage} alt="Eyes" /></div>
      <p className="score"> You scrore is</p>
    </div>
  );
};

export default Congratulation;
