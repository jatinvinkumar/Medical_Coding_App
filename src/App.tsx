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
import { AuthContextProvider } from './firebase/AuthContext';
import ProtectedRoute from './firebase/ProtectedRoute';
import Sidebar from './framework/presentation/components/SideBar';
import { Col, Row } from 'react-bootstrap';
import BillForm from './framework/presentation/components/BillForm';
import Footer from './framework/presentation/components/Footer';

const App = () => {
  const [apiCallsCount, setApiCallsCount] = useState(50);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/provider" element={
            <ProtectedRoute>
              <Header />
              <div className='app-container-container'>
              <Row className='app-container'>
                <Col xs={12} md={2}  className="sidebar-container">
                  <Sidebar/>
                </Col>
                <Col>
                <AddForm />
                </Col>
              </Row>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <div style={{position: "relative", height:'100vh', paddingBottom: '300px'}}>
                <Header />
                <div style={{position: 'absolute',top: 0,left: 0,right: 0,height: 300,backgroundColor: '#E8F0FE',zIndex: -1}} />
                <Container> <BillForm/></Container>
                <Footer/>
              </div>
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
