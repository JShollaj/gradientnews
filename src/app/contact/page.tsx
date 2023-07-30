"use client";

import { useState } from 'react';
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";

const Contact = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => { 
    event.preventDefault();

    const response = await fetch('https://bqaippenz3.execute-api.ap-southeast-1.amazonaws.com/prod/contactform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      console.error('Failed to send message');
      return;
    }

    setName('');
    setEmail('');
    setMessage('');

    alert('Message sent successfully!');
  };

  return (
    <>
      <SeoMeta
        title="Contact"
        meta_title="Contact"
        description="Contact page"
        image="image_url"
      />
      <PageHeader title="Contact" />
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    className="form-input"
                    placeholder="John Doe"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="mail" className="form-label">
                    Working Mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="mail"
                    className="form-input"
                    placeholder="john.doe@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="form-label">
                    Anything else? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="form-input"
                    placeholder="Message goes here..."
                    id="message"
                    rows={8}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
