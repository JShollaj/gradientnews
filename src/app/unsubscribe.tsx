"use client";
import React, { useState, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const UnsubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleRecaptchaChange = useCallback((token: string | null) => {
    setRecaptchaToken(token);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if the reCAPTCHA token is present
    if (!recaptchaToken) {
      setMessage("Please verify the reCAPTCHA before submitting.");
      return;
    }

    // Use the URL of your API Gateway
    const response = await fetch('{Invoke URL}/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email, recaptchaToken }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // Handle error
      setMessage("Failed to unsubscribe email. Please try again later.");
      console.error('Failed to unsubscribe email');
      return;
    }

    // Clear the email field and reCAPTCHA
    setEmail('');
    setRecaptchaToken(null);

    // Display success message
    setMessage("Successfully unsubscribed. You will not receive any more emails from us.");
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

      <ReCAPTCHA
        sitekey="6LfnimUnAAAAAKwCUX2PVZOr4QXxZ7vzFuGV0zeB"
        onChange={handleRecaptchaChange}
      />

      <button 
        type="submit"
        className="px-6 py-2 mt-4 text-white bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-black"
      >
        Unsubscribe
      </button>

      <p>{message}</p>
    </form>
  );
};

export default UnsubscribeForm;
