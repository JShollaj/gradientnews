"use client";
import React, { useState, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const EmailForm = () => {
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
    const response = await fetch('https://lged5svcm6.execute-api.ap-southeast-1.amazonaws.com/prod/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, recaptchaToken }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // Handle error
      setMessage("Failed to subscribe email. Please try again later.");
      console.error('Failed to subscribe email');
      return;
    }

    // Clear the email field and reCAPTCHA
    setEmail('');
    setRecaptchaToken(null);

    // Display success message
    setMessage("Successfully subscribed. Check your email every Sunday for latest news!");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email Here"
        required 
        className="form-input w-full md:w-1/2 px-3 py-2 placeholder-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-offset-gray-900"
      />

      <ReCAPTCHA
        sitekey="6LfnimUnAAAAAKwCUX2PVZOr4QXxZ7vzFuGV0zeB"
        onChange={handleRecaptchaChange}
      />

      <button 
        type="submit"
        className="px-6 py-2 mt-4 text-white bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-black"
      >
        Subscribe
      </button>

      <p>{message}</p>
    </form>
  );
};

export default EmailForm;
