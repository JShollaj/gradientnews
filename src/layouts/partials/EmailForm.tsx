"use client"; // Add this line
import React, { useState } from "react";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Replace the URL with your actual API Gateway URL
    const response = await fetch('https://lged5svcm6.execute-api.ap-southeast-1.amazonaws.com/prod', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      

    const responseBody = await response.json();

    if (!response.ok) {
      // Handle error
      console.error('Failed to subscribe email');
      setMessage(responseBody.error || 'Failed to subscribe email');
      return;
    }

    // Clear the email field
    setEmail('');
    setMessage('Email stored successfully.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email Here"
        required 
        style={{ marginRight: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', color: '#000', backgroundColor: '#fff' }} // Inline style
      />
      <button 
        type="submit"
        style={{ backgroundColor: '#000', border: 'none', color: '#fff', padding: '10px 24px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer', borderRadius: '4px' }} // Inline style
      >
        Subscribe
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EmailForm;
