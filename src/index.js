import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'react-alice-carousel/lib/alice-carousel.css';
import { UserContextProvider } from './context/userContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Router>
);

