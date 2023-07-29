"use client"; // Add this line
import React, { useState } from "react";

const EmailForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Use the URL of your API Gateway
    const response = await fetch('https://lged5svcm6.execute-api.ap-southeast-1.amazonaws.com/prod', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // Handle error
      console.error('Failed to subscribe email');
      return;
    }

    // Clear the email field
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email Here"
        required 
        className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-offset-gray-900 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
      />
      <button 
        type="submit"
        className="px-6 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
      >
        Subscribe
      </button>
    </form>
  );
};

export default EmailForm;
