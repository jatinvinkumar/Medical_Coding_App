import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import './AddForm.css';

type Metadata = {
  'CPT Code': string;
  'Clinician Descriptor': string;
  'Consumer Friendly Descriptor': string;
};

type CPTCode = {
  id: string;
  metadata: Metadata;
  score: number;
  values: any[];
};

type Procedure = {
  description: string;
  cpt_codes: CPTCode[];
};

type Diagnosis = {
  description: string;
  icd_codes: any[];
};

type Data = {
  situation: string;
  diagnosises: Diagnosis[];
  procedures: Procedure[];
  suggested_cpt_codes: any[];
  suggested_icd_codes: any[];
};

const MedicalDataVisualization: React.FC<{ data?: Data, code_type: string }> = ({ data, code_type }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  if (code_type === "icd") {
    return(
        <div className="mt-3">
      <Row>
        <Col>
          <h4 className="custom-heading">Suggested Codes:</h4>
          <Table striped bordered hover size="sm" className="json-data">
              <thead>
              <tr>
              <th>ICD Code</th>
              <th>Descriptor</th>
              <th>Category</th>
              <th>Category Descriptor</th>
              </tr>
              </thead>
            {data.suggested_icd_codes.map((code, index) => (
              
              <tbody>
              <tr key={code.id}>
              <td>{code['title']}</td>
              <td>{code['desc']}</td>
              <td>{code['Category_Name']}</td>
              <td>{code['Category_Desc']}</td>
              </tr>
              </tbody>
              
            ))}
            </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="custom-heading">Focused Details:</h4>
          <Accordion>
            {data.diagnosises.map((diagnosis, index) => (
    <Accordion.Item eventKey={index}>
    <Accordion.Header className="accordian-header">{diagnosis.description}</Accordion.Header>
    <Accordion.Body className="custom-text">
    <Table striped bordered hover size="sm" className="json-data">
    <thead>
    <tr>
    <th>ICD Code</th>
    <th>Descriptor</th>
    <th>Category</th>
    <th>Category Descriptor</th>
    </tr>
    </thead>
    <tbody>
    {diagnosis.icd_codes.map((code) => (
    <tr key={code.id}>
    <td>{code['title']}</td>
    <td>{code['desc']}</td>
    <td>{code['Category_Name']}</td>
    <td>{code['Category_Desc']}</td>
    </tr>
    ))}
    </tbody>
    </Table>
    </Accordion.Body>
    </Accordion.Item>
    ))}
    </Accordion>
    </Col>
    </Row>
    </div>
    )
  }

  return (
    <div className="mt-3">
      <Row>
        <Col>
          <h4 className="custom-heading">Suggested Codes:</h4>
          <Table striped bordered hover size="sm" className="json-data">
              <thead>
              <tr>
              <th>CPT Code</th>
              <th>Clinician Descriptor</th>
              <th>Consumer Friendly Descriptor</th>
              </tr>
              </thead>
            {data.suggested_cpt_codes.map((code, index) => (
              
              <tbody>
              <tr key={code.id}>
              <td>{code['CPT Code']}</td>
              <td>{code['Clinician Descriptor']}</td>
              <td>{code['Consumer Friendly Descriptor']}</td>
              </tr>
              </tbody>
              
            ))}
            </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="custom-heading">Focused Details:</h4>
          <Accordion>
            {data.procedures.map((procedure, index) => (
    <Accordion.Item eventKey={index}>
    <Accordion.Header className="accordian-header">{procedure.description}</Accordion.Header>
    <Accordion.Body className="custom-text">
    <Table striped bordered hover size="sm" className="json-data">
    <thead>
    <tr>
    <th>CPT Code</th>
    <th>Clinician Descriptor</th>
    <th>Consumer Friendly Descriptor</th>
    </tr>
    </thead>
    <tbody>
    {procedure.cpt_codes.map((code) => (
    <tr key={code.id}>
    <td>{code.metadata['CPT Code']}</td>
    <td>{code.metadata['Clinician Descriptor']}</td>
    <td>{code.metadata['Consumer Friendly Descriptor']}</td>
    </tr>
    ))}
    </tbody>
    </Table>
    </Accordion.Body>
    </Accordion.Item>
    ))}
    </Accordion>
    </Col>
    </Row>
    </div>
    );
    };
    
    export default MedicalDataVisualization;