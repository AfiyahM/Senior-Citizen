// Tutorials.js
import React from 'react';
import './Tutorials.css';

const tutorials = [
  { title: 'Getting Started',        description: 'Basics of using a smartphone or computer' },
  { title: 'Connecting with Family', description: 'Learn to use messaging and video call apps' },
  { title: 'Health & Wellness Apps', description: 'Managing health with technology' }
];

const Tutorials = () => {
  return (
    <div className="tutorials">
      <h1>Tutorials</h1>
      <div className="tutorial-list">
        {tutorials.map((tutorial, index) => (
          <div key={index} className="tutorial-card">
            <h3>{tutorial.title}</h3>
            <p>{tutorial.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
