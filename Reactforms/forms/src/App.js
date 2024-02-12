import React, { useState } from 'react';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const userData = {
    firstName,
    lastName,
    age,
    email,
    description,
    file,
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (file) {
        if (file.name.endsWith('.csv')) {
          setErrorMessage('');
          const reader = new FileReader();
          reader.onload = (event) => {
            const csv = event.target.result;
            const lines = csv.split('\n');
            const data = lines.map((line) => line.split(','));
            setCsvData(data);
            console.log('CSV Data:', data);
          };
          reader.readAsText(file);
        } else {
          setErrorMessage('Please select a CSV file.');
        }
      }
      console.log('User Data:', userData);
      localStorage.setItem('csvData', JSON.stringify(csvData));
      setFirstName('');
      setLastName('');
      setAge('');
      setEmail('');
      setDescription('');
      setFile(null);
    }
  };
  

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(errors);

    return isValid;
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>React Forms</h2>
        <form onSubmit={handleSubmit}>
          <label>First name</label>
          <input
            placeholder="Enter your first name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}

          <label>Last name</label>
          <input
            placeholder="Enter your last name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}

          <label>Age</label>
          <input
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label>Email</label>
          <input
            placeholder="Enter your email-id"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>Description</label>
          <input
            placeholder="Enter your description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Upload File</label>
          <input type="file" accept=".csv" onChange={handleFile} />
          {errorMessage && <span className="error">{errorMessage}</span>}

          <button type="submit">Submit</button>
        </form>
      </div>

      {csvData.length > 0 && (
        <div className="csv-container">
          <h2>Uploaded Data</h2>
          <table>
            <thead>
              <tr>
                {csvData[0].map((head, i) => (
                  <th key={i}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowi) => (
                <tr key={rowi}>
                  {row.map((cell, celli) => (
                    <td key={celli}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
