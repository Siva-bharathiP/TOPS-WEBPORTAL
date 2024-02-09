import React, { useState } from 'react';
import './FirstPage.css'

function RegistrationForm() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!name.trim()) {
      formErrors.name = 'Name is required';
    }

    if (!gender) {
      formErrors.gender = 'Gender is required';
    }

    if (!dateOfBirth.trim()) {
      formErrors.dateOfBirth = 'Date of Birth is required';
    }

    if (!age.trim()) {
      formErrors.age = 'Age is required';
    }

    if (!email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Invalid email format';
    }

    if (Object.keys(formErrors).length === 0) {
      // No errors, proceed with registration logic
      const registrationData = {
        name,
        gender,
        dateOfBirth,
        age,
        email
      };

      console.log('Registration Data:', JSON.stringify(registrationData));

      // Reset form fields
      setName('');
      setGender('');
      setDateOfBirth('');
      setAge('');
      setEmail('');
    } else {
      // Update the state with errors
      setErrors(formErrors);
    }
  };

  return (
    <div className='Container'>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} className='Form-Container'>
        <div>
          <label className='label-txt'>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='Input-Txt'
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div>
          <label className='label-txt'>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='Input-Txt'
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div>
          
          <div>
          <label className='label-txt'>Gender:</label>
            <label className='label-txt'>
              <input
                type="radio"
                value="male" 
                checked={gender === 'male'}
                onChange={() => setGender('male')
            }
              />
              Male
            </label>
            <label className='label-txt'>
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
              />
              Female
            </label>
            <label className='label-txt'>
              <input
                type="radio"
                value="transgender"
                checked={gender === 'transgender'}
                onChange={() => setGender('transgender')}
              />
              Transgender
            </label>
          </div>
          {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
        </div>
        <div>
          <label className='label-txt'>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            className='Input-Txt'
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          {errors.dateOfBirth && <span style={{ color: 'red' }}>{errors.dateOfBirth}</span>}
        </div>
        <div>
          <label className='label-txt'>Age:</label>
          <input
            type="number"
            value={age}
            className='Input-Txt'
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
        </div>
        
        <button type="submit" className='Input-Txt'>Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
