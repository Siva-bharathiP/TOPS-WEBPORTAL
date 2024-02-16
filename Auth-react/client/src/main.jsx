import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="414470545153-6r8c16g4gv9v194it8q9kmgs5d100asf.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>;
  </React.StrictMode>,
)
