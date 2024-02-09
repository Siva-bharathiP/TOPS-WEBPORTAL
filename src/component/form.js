import React, { useState } from 'react';
import './display.css';

const MyForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNO, setPhoneNo] = useState('');
  const [message, setMessage] = useState('');
  const [validate, setvalidate] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const validate = {};
    if (!name) {
      validate.name = 'Name is required';
    }
    if (!email) {
      validate.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validate.email = 'Email is invalid';
    }
    if (!phoneNO) {
      validate.phoneNO = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(phoneNO)) {
      validate.phoneNO = 'Phone Number is invalid';
    }
    setvalidate(validate);

    
    if (Object.keys(validate).length === 0) {
      console.log('Form submitted:', { name, email, message, phoneNO });
      setName('');
      setEmail('');
      setMessage('');
      setPhoneNo('');
    }
  };

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {validate.name && <span>{validate.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {validate.email && <span>{validate.email}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="Number"   
            value={phoneNO}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
          {validate.phoneNO && <span>{validate.phoneNO}</span>}
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
