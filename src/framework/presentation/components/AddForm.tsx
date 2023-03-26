import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { JsonViewer } from '@textea/json-viewer';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Spinner,
  Dropdown,
  Tabs,
  Tab
} from 'react-bootstrap';

const AddForm = () => {
  const isLoggedIn = true;
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [jsonDesc, setJsonDesc] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [getICD10, setGetICD10] = useState(false);
  const [getCPT, setGetCPT] = useState(false);


  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (descRef.current?.checkValidity()) {
      const payload = { situation: descRef.current.value };
  
      // Set the default URL for ICD-10 codes
      let url = 'http://127.0.0.1:5000/getCodes';
  
      // If the user selected the Get CPT Codes checkbox
      if (getCPT) {
        url = 'http://127.0.0.1:5000/getCPTCodes';
      }
  
      // If the user selected both checkboxes, show an error message
      if (getICD10 && getCPT) {
        alert('Please select only one option: ICD-10 or CPT Codes');
        setLoading(false);
        return;
      }
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
  
      await fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setJsonDesc(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  };
  

  const renderDropdowns = (json: any) => {
    if (!json) return null;
  
    const cptCodes = json.cpt_codes.map((code: any, index: number) => (
      <Dropdown.Item key={`cpt-code-${index}`} className="text-wrap dropdown-item-custom">
        <strong>CPT Code:</strong> {code.metadata["CPT Code"]}
        <br />
        <strong>Clinician Descriptor:</strong> {code.metadata["Clinician Descriptor"]}
        <br />
        <strong>Consumer Friendly Descriptor:</strong> {code.metadata["Consumer Friendly Descriptor"]}
      </Dropdown.Item>
    ));
  
    return (
      <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="situation-dropdown" className="text-wrap dropdown-toggle-custom">
          {json.situation}
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-custom">{cptCodes}</Dropdown.Menu>
      </Dropdown>
    );
  };
  

  return (
    <Container>
      <Row>
        <Col xs={12} md={7} className="mt-5">
          <h2>Patient Care Description</h2>
          <Form onSubmit={formSubmit}>
            <FormGroup>
              <FormLabel htmlFor="description">
                Up to 28,000 characters
              </FormLabel>
              <FormControl
                as="textarea"
                id="description"
                placeholder="Write down what the patient's problem was and the care provided"
                rows={5}
                required
                ref={descRef}
                className="mb-3"
              />
            </FormGroup>
            <h5>Analysis Options</h5>
            <Form.Group>
            <Form.Check
              type="checkbox"
              id="get-icd10"
              label="Get ICD-10 Codes"
              className="mb-2"
              onChange={(e) => setGetICD10(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              id="get-cpt"
              label="Get CPT Codes [2023]"
              className="mb-2"
              onChange={(e) => setGetCPT(e.target.checked)}
            />
              <Form.Check
                type="checkbox"
                id="get-phi"
                label="Get PHI (coming soon)"
                className="mb-2"
                disabled
              />
              <Form.Check
                type="checkbox"
                id="redact"
                label="Redact (coming soon)"
                className="mb-3"
                disabled
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mr-2"
              disabled={!isLoggedIn || isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                'Run Analysis'
              )}
            </Button>
          </Form>
        </Col>
        <Col xs={12} md={5} className="mt-5">
          <Tabs defaultActiveKey="json-viewer" id="json-tabs">
            <Tab eventKey="json-viewer" title="JSON Viewer">
              <JsonViewer value={jsonDesc} />
            </Tab>
            <Tab eventKey="dropdowns" title="Dropdowns">
              {renderDropdowns(jsonDesc)}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
  
};

export default AddForm;
