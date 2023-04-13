import React, { useState } from 'react';
import { Card, Row, Col, Image, FormControl, Button, Form, Dropdown } from 'react-bootstrap';
import './CustomCard.css';
import umbrella from './umbrella.png';
import hospital from './crayon-heart.png'; // Replace this with your new image
import insurance from './umbrella.png'; // Replace this with your new image

const CustomCard = () => {
  const [step, setStep] = useState(0);
  const [inputText, setInputText] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [cptCodes, setCptCodes] = useState([{ cptCode: '', charge: '' }]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleInsuranceChange = (value) => {
    setInsuranceType(value);
  };

  const handleAddCptCodeRow = () => {
    setCptCodes([...cptCodes, { cptCode: '', charge: '' }]);
  };

  const handleCptCodeChange = (e, index, field) => {
    const newCptCodes = [...cptCodes];
    newCptCodes[index][field] = e.target.value;
    setCptCodes(newCptCodes);
  };

  const images = [
    { src: umbrella, alt: 'Umbrella' },
    { src: hospital, alt: 'Hospital' }, // Replace this with your new image
    { src: insurance, alt: 'Insurance' }, // Replace this with your new image
  ];

  const colors = ['#4852DD', '#4852DD', '#4852DD'];

  const insuranceOptions = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <Card className="mt-3 mb-5" style={{ backgroundColor: colors[step], display: 'flex', height: 500 }}>
      <Row style={{ padding: 20, height: '100%' }} className="d-flex align-items-center">
        <Col xs={5} md={5} lg={5} xl={5} style={{ overflow: 'hidden', padding: 20 }} className="d-flex align-items-center justify-content-center">
          <Image src={images[step].src} alt={images[step].alt} width="80%" />
        </Col>
        <Col xs={6} md={6} lg={6} xl={6} className="d-flex align-items-center flex-column justify-content-center">
          <Form onSubmit={handleFormSubmit}>
            {step === 0 && (
              <div>
                <h3 style={{ textAlign: 'left' }} className="text-white font-weight-bold">
                  Hello! <br /> Which hospital did you visit?
                </h3>
                <FormControl className="flat-text-box mt-2" type="text" placeholder="Enter text" onChange={handleInputChange} />
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 style={{ textAlign: 'left' }} className="text-white font-weight-bold">
                What type of insurance do you have?
                </h3>
                <Dropdown onSelect={handleInsuranceChange} className="mt-2">
                <Dropdown.Toggle className="flat-text-box" variant="light" id="dropdown-basic">
                {insuranceType || 'Select insurance type'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {insuranceOptions.map((option, index) => (
                <Dropdown.Item key={index} eventKey={option}>
                {option}
                </Dropdown.Item>
                ))}
                </Dropdown.Menu>
                </Dropdown>
                </div>
                )}

{step === 2 && (
          <div>
            <h3 style={{ textAlign: 'left' }} className="text-white font-weight-bold">
              What CPT codes were you billed for?
            </h3>
            {cptCodes.map((cptCode, index) => (
              <Row key={index} className="mt-2">
                <Col>
                  <FormControl
                    className="flat-text-box"
                    type="text"
                    placeholder="CPT code"
                    value={cptCode.cptCode}
                    onChange={(e) => handleCptCodeChange(e, index, 'cptCode')}
                  />
                </Col>
                <Col>
                  <FormControl
                    className="flat-text-box"
                    type="text"
                    placeholder="Charge"
                    value={cptCode.charge}
                    onChange={(e) => handleCptCodeChange(e, index, 'charge')}
                  />
                </Col>
              </Row>
            ))}
            <Button className="rounded-button mt-2" onClick={handleAddCptCodeRow}>
              Add row
            </Button>
          </div>
        )}

        {step < 2 && (
          <Button className="rounded-button mt-2" type="submit" disabled={!inputText || (step === 1 && !insuranceType)}>
            Continue{" "}
            <span role="img" aria-label="right arrow">
              →
            </span>
          </Button>
        )}
      </Form>
    </Col>
  </Row>
</Card>
);
};

export default CustomCard;
