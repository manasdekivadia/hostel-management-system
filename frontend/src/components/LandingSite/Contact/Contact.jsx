import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.send(
      'service_0efzx8m',
      'template_3ref3vd',
      { email, subject, message },
      'Tew9A-B-c5W2S7CYH'
    )
      .then(() => {
        setIsSending(false);
        setIsSent(true);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setIsSending(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'subject') setSubject(value);
    else if (name === 'message') setMessage(value);
  };

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Contact Us
        </h2>
        <p className="text-gray-400 text-center mb-8">
          If you're facing any problems or have a query, we’re here to help!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-gray-300 block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="text-gray-300 block mb-2 text-sm font-medium">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="How can we help?"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="text-gray-300 block mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Leave your message here..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            disabled={isSending || isSent}
          >
            {isSending ? 'Sending...' : isSent ? 'Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

export { Contact };
