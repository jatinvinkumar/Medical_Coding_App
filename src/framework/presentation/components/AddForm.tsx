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
  Tab, Card, ListGroup
} from 'react-bootstrap';
import MedicalDataVisualization from './MedicalVisualizer';

const AddForm = () => {
  const isLoggedIn = true;
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [jsonDesc, setJsonDesc] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [getICD10, setGetICD10] = useState(false);
  const [getCPT, setGetCPT] = useState(false);
  const [chunkText, setChunkText] = useState(false);

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (descRef.current?.checkValidity()) {
      const payload = { situation: descRef.current.value };
  
      // Set the default URL for ICD-10 codes
      let base_url = "https://medcodeapi.herokuapp.com"
      let url = base_url + '/getCodes';
  
      // If the user selected the Get CPT Codes checkbox
      if (getCPT) {
        url = base_url + '/getCPTCodes';
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

  
  return (
    <Container>
      <Row>
        <Col xs={12} md={7} className="mt-5">
          <h2>Patient Care Description</h2>
          <Form onSubmit={formSubmit}>
            <FormGroup>
              <FormLabel htmlFor="description">
                Up to 12,000 characters
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
            <Row>
              <Col xs={12} md={6}>
                <Form.Check
                  type="checkbox"
                  id="get-icd10"
                  label="ICD-10 Codes [2021]"
                  className="mb-2"
                  onChange={(e) => setGetICD10(e.target.checked)}
                />
                <Form.Check
                  type="checkbox"
                  id="get-cpt"
                  label="CPT/HCPCS1 Codes [2023]"
                  className="mb-2"
                  onChange={(e) => setGetCPT(e.target.checked)}
                />
              </Col>
              <Col xs={12} md={6}>
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
              </Col>
            </Row>

            <h5>Advanced Configuration</h5>
            <Form.Group>
            <Form.Check
              type="checkbox"
              id="focus-text"
              label="Focus Text"
              className="mb-2"
              onChange={(e) => setChunkText(e.target.checked)}
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
            <Tab eventKey="icd" title="ICD-10">
              {/* {renderDropdowns(jsonDesc)} */}
              <MedicalDataVisualization data={jsonDesc} code_type="icd" />
            </Tab>
            <Tab eventKey="dropdowns" title="CPT/HCPCS1">
              {/* {renderDropdowns(jsonDesc)} */}
              <MedicalDataVisualization data={jsonDesc} code_type="cpt" />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
  
};

export default AddForm;
