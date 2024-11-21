// GetMastered.js
import React from 'react';
import './GetMastered.css';

const masteredItems = [
  { name: 'WhatsApp', description: 'Messaging, voice/video calls, and more.' },
  { name: 'Amazon', description: 'Online shopping basics.' },
  { name: 'Facebook', description: 'Connecting with friends and family.' },
  { name: 'Netmeds', description: 'Ordering medicines online.' }
];

const GetMastered = () => {
  return (
    <div className="get-mastered">
      <h1>Get Mastered In</h1>
      <div className="app-list">
        {masteredItems.map((item, index) => (
          <div key={index} className="app-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetMastered;
