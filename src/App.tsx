// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './framework/presentation/components/Header';
import Container from './framework/presentation/components/Container';
import AddForm from './framework/presentation/components/AddForm';
import BookContainer from './framework/presentation/components/book/BookContainer';
import Login from './framework/presentation/components/Login';
import './framework/presentation/components/AddForm.css';
import Signup from './framework/presentation/components/Signup';

const App = () => {
  const [apiCallsCount, setApiCallsCount] = useState(50);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  
  const SidePanel = () => {
    const progressBarPercentage = (apiCallsCount / 100) * 100;
    
    return (
      <div className="side-panel d-flex flex-column justify-content-between">
        <div className="logo-container">
          <img src="path/to/your/logo.png" alt="Logo" />
        </div>
        <div className="api-counter-container">
          <div className="api-counter">
            API Calls: {apiCallsCount}/100
          </div>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progressBarPercentage}%` }}
              aria-valuenow={progressBarPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <a href="link/to/plans" className="btn btn-primary mt-2">
            See All Plans
          </a>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <>
            <Header />
            {/* <SidePanel /> */}
            <Container>
                <AddForm />
            </Container>
            </>
        } />
      </Routes>
    </Router>
  );
};

export default App;
