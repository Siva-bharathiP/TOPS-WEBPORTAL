import "./form.css";
import { useState } from "react";

function Form() {
  const [sno, setNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState(null);

  function validateForm(e) 
  {

    if (firstName.length === 0) {
      alert("First name is empty");
    }

    if (email.length === 0) {
      alert("Email Address is empty");
    }

    if (password.length < 8) {
      alert(
        "Invalid Form, Password must contain greater than or equal to 8 characters."
      );
    }

    let countUpperCase = 0;
    let countLowerCase = 0;
    let countDigit = 0;
    let countSpecialCharacters = 0;

    for (let i = 0; i < password.length; i++) {
      const specialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "-",
        "+",
        "=",
        "[",
        "{",
        "]",
        "}",
        ":",
        ";",
        "<",
        ">",
      ];

      if (specialChars.includes(password[i])) {
        countSpecialCharacters++;
      } else if (!isNaN(password[i] * 1)) {
        countDigit++;
      } else {
        if (password[i] === password[i].toUpperCase()) {
          countUpperCase++;
        }
        if (password[i] === password[i].toLowerCase()) {
          countLowerCase++;
        }
      }
    }

    if (countLowerCase === 0) {
      alert("No lower case characters in password");
      return;
    }

    if (countUpperCase === 0) {
      alert("No upper case characters in password");
      return;
    }

    if (countDigit === 0) {
      alert("No digit characters in password");
      return;
    }

    if (countSpecialCharacters === 0) {
      alert("No special characters in password");
      return;
    }

    if (age < 20) {
      alert("Age must be greater than 20");
    }
    
    const data = {
      sno,
      firstName,
      lastName,
      mobile,
      age,
      email,
      password,
    };
  
    setFormData(data);

    console.log("Form Data:", data); 

    // alert("Form is valid");
  }

  return (
    <div className="main">
      <form>
        <input placeholder="S.No" onChange={(e) => setNo(e.target.value)} />

        <input
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
        />
        <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => {
            validateForm();
          }}
        >
          Submit
        </button>
      </form>

      {formData && (
        <div className="formData">
          <h2>Form Data:</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Form;
