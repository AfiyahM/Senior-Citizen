import React from 'react';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="main-heading">Contact Us</h1>
      <p className="description">
        Email: supportseniorconnect@gmail.com
      </p>
      
      <h2 className="sub-heading">Contact Form</h2>
      
      <form className="contact-form">
        <label className="form-label">Name</label>
        <input type="text" placeholder="Your Name" className="form-input" />
        
        <label className="form-label">Email</label>
        <input type="email" placeholder="Your Email" className="form-input" />
        
        <label className="form-label">Message</label>
        <textarea placeholder="Your Message" className="form-textarea"></textarea>
        
        <button type="submit" className="form-button">Send</button>
      </form>
    </div>
  );
};

export default Contact;
