import React, { useState } from "react";
import { Container, Card, Form, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "./recurringOrderView.css";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../common/button/submitButton";

export default function Index() {
  const [startDate, setStartDate] = useState("2025-05-10");
  const [endDate, setEndDate] = useState("2025-05-10");


  const navigate = useNavigate()

  const handleContinue = () => {
  navigate('/productList?recurring=1')
  }

  return (
    <Container className="mt-5">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="d-flex justify-content-between align-items-center mb-3"
      >
        <h4 className="fw-bold text-dark">Periyasami</h4>
        <span className="text-success fw-bold">ID: 20250005</span>
      </motion.div>

      {/* Recurrence Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="recurrence-card p-4 glassmorphism">
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold text-dark">Recurrence</h6>
            <div className="top-right-design"></div>
          </div>
          <div className="recurrence-placeholder"></div>
        </Card>
      </motion.div>

      {/* Date Inputs */}
      <Row className="mt-4">
        <Col md={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Form.Group>
              <Form.Label className="fw-bold text-dark">Start On</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="shadow-sm input-box"
              />
            </Form.Group>
          </motion.div>
        </Col>
        <Col md={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Form.Group>
              <Form.Label className="fw-bold text-dark">End On</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="shadow-sm input-box"
              />
            </Form.Group>
          </motion.div>
        </Col>
      </Row>

      {/* Holiday Input */}
      <motion.div whileHover={{ scale: 1.02 }} className="mt-4">
        <Form.Group>
          <Form.Label className="fw-bold text-dark">Holiday</Form.Label>
          <Form.Control type="text" placeholder="Placeholder" className="shadow-sm input-box" />
        </Form.Group>
      </motion.div>
      
      <motion.div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "130px",
          paddingTop:30
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        onClick={() => setShowModal(true)}
      >
        <SubmitButton handleSubmit={handleContinue} title={"Continue"} />
      </motion.div>
    </Container>
  );
}
