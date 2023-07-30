"use client";
import { useState, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Unsubscribe = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleRecaptchaChange = useCallback((token: string | null) => {
    setRecaptchaToken(token);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!recaptchaToken) {
      setMessage("Please verify the reCAPTCHA before submitting.");
      return;
    }

    const response = await fetch('https://vrvjztvde5.execute-api.ap-southeast-1.amazonaws.com/prod', {
      method: 'POST',
      body: JSON.stringify({ email, feedback, recaptchaToken }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      setMessage("Failed to unsubscribe. Please try again later.");
      console.error('Failed to unsubscribe');
      return;
    }

    setEmail('');
    setFeedback('');
    setRecaptchaToken(null);

    setMessage("Successfully unsubscribed. Thank you for your feedback!");
  };

  return (
    <>
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    className="form-input"
                    placeholder="john.doe@email.com"
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="feedback" className="form-label">
                    Feedback
                  </label>
                  <textarea
                    id="feedback"
                    className="form-input"
                    placeholder="Please tell us why you're unsubscribing."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>

                <ReCAPTCHA
                  sitekey="6LfnimUnAAAAAKwCUX2PVZOr4QXxZ7vzFuGV0zeB"
                  onChange={handleRecaptchaChange}
                />

                <button type="submit" className="btn btn-primary">
                  Unsubscribe
                </button>

                <p>{message}</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Unsubscribe;
