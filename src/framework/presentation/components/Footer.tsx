import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./Footer.css"

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#343a40' }} className="footer">
      <Container>
        {/* <Row>
          <Col md={4} className="text-white mb-3">
            <h4>Company Name</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusantium quia in deleniti dolore architecto ipsum.
            </p>
          </Col>
          <Col md={4} className="text-white mb-3">
            <h4>Quick Links</h4>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
              <li><a href="/services" className="text-white">Services</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-white mb-3">
            <h4>Contact Us</h4>
            <p>
              123 Main Street,<br />
              City, State 12345<br />
              Email: info@example.com<br />
              Phone: (123) 456-7890
            </p>
          </Col>
        </Row> */}
        <Row>
          <Col className="text-center text-white mt-3">
            <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
