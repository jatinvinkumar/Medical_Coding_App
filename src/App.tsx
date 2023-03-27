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
import './framework/presentation/components/AddForm.css';
import { AuthContextProvider } from './firebase/AuthContext';
import ProtectedRoute from './firebase/ProtectedRoute';

const App = () => {
  const [apiCallsCount, setApiCallsCount] = useState(50);

  // ... your existing SidePanel component
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
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              {/* <SidePanel /> */}
              <Header />
              <Container>
                  <AddForm />
              </Container>
            </ProtectedRoute>
          } />
          <Route path="terms" element={<p>Terms</p>} />
          <Route path="privacy" element={<p>Privacy</p>} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
