"use client";
import React, { useState } from "react";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('https://lged5svcm6.execute-api.ap-southeast-1.amazonaws.com/prod/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
          'X-Amz-Date': new Date().toISOString(),
          'Authorization': '',  // Update this with your Authorization token
          'X-Api-Key': '',  // Update this with your API Key
          'X-Amz-Security-Token': ''  // Update this with your security token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe email');
      }

      // Clear the email field
      setEmail('');
      setMessage('Successfully Subscribed - Check your junk email just in case :)');
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email Here"
        required 
        className="px-3 py-2 mb-4 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-offset-gray-900 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
      />
      <button 
        type="submit"
        className="px-6 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-black"
      >
        Subscribe
      </button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </form>
  );
};

export default EmailForm;
