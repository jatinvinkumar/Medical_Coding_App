import React from 'react';
import { Nav, NavItem, NavLink, Card, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';
import { FaCog, FaPlay, FaRegChartBar, FaRegCheckCircle } from 'react-icons/fa';
import './SideBar.css';

const Sidebar = ({ currentUsage = 9, maxUsage = 1000 }) => {
  return (
    <Nav className="flex-column sidebar" variant="pills">
      <NavItem className="mt-0">
        <NavLink eventKey="generate" className="nav-item-custom">
          <FaPlay /> Generate
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink eventKey="evaluate" className="nav-item-custom">
          <FaRegChartBar /> Evaluate
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink eventKey="settings" className="nav-item-custom">
          <FaCog /> Settings
        </NavLink>
      </NavItem>
      <NavItem className="mt-auto">
        <Card>
          <Card.Header>API Usage</Card.Header>
          <ListGroup variant="flush">
            <ListGroupItem>
              <span>Progress:</span>
              <ProgressBar
                now={currentUsage}
                label={`${currentUsage}%`}
                max={maxUsage}
              />
            </ListGroupItem>
            <ListGroupItem>
              <span>Current Usage:</span> {currentUsage}/{maxUsage}
            </ListGroupItem>
          </ListGroup>
        </Card>
      </NavItem>
    </Nav>
  );
};

export default Sidebar;
