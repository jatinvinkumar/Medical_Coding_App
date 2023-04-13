import React, { useState } from 'react';
import { Card, Row, Col, Image, FormControl, Button } from 'react-bootstrap';
import './CustomCard.css';
import umbrella from './umbrella.png';

const CustomCard = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <Card className="mt-3 mb-5" style={{  display: 'flex', height: 500 }}>
      <Row style={{ padding: 20, height: '100%' }} className="d-flex align-items-center">
        <Col
          xs={5}
          md={5}
          lg={5}
          xl={5}
          style={{ overflow: 'hidden', padding: 20}}
          className="d-flex align-items-center justify-content-center"
        >
          <Image src={umbrella} width="80%" />
        </Col>
        <Col xs={6} md={6} lg={6} xl={6} className="d-flex align-items-center flex-column justify-content-center">
          <div>
            <h3 style={{ textAlign: 'left' }} className="text-white font-weight-bold">
              Hello! <br /> Which hospital did you visit?
            </h3>
            <FormControl
              className="flat-text-box mt-2"
              type="text"
              placeholder="Enter text"
              onChange={handleInputChange}
            />
            <Button
                className="rounded-button"
                style={{
                marginTop: 30,
                marginRight: 0,
                }}
                disabled={!inputText}
            >
                Continue{" "}
                <span role="img" aria-label="right arrow">
                →
                </span>
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CustomCard;