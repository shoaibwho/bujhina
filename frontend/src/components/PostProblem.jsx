import React, { useState } from 'react';
import axios from 'axios';

const PostProblem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [payment, setPayment] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/problems', {
        title,
        description,
        subject,
        payment,
      });
      console.log(response.data); // Success message or redirect
      // Clear form after successful submission
      setTitle('');
      setDescription('');
      setSubject('');
      setPayment(0);
    } catch (err) {
      console.error(err);
      // Handle errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="payment">Payment (amount):</label>
        <input type="number" id="payment" value={payment} onChange={(e) => setPayment(e.target.value)} required />
      </div>
      <button type="submit">Post Problem</button>
    </form>
  );
};

export default PostProblem;
