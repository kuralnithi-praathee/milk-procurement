import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import img from "../../assets/web.svg"
import { useNavigate } from "react-router-dom";
export default function Index() {

const navigate = useNavigate()

  return (
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        {/* Left Side - Image Section */}
        <Col md={6} className="d-none d-md-flex align-items-center justify-content-center" style={{ backgroundColor: "#f8f9fa" }}>
          <img
            src={img}
            alt="Freshness Delivered"
            className="img-fluid"
            style={{ maxWidth: "70%", borderRadius: "10px" }}
          />
        </Col>

        {/* Right Side - Login Form */}
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
          <div style={{ maxWidth: "400px", width: "100%", textAlign: "left" }}>
            <h2 className="fw-bold">Welcome</h2>
            <p className="text-muted">
              Freshness delivered daily, straight to your doorstep!
            </p>

            <Form>
              {/* Email Field */}
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label className="fw-bold">Email ID</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your mail ID"
                  className="p-3 rounded-pill border"
                />
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  className="p-3 rounded-pill border"
                />
              </Form.Group>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-100 p-3 rounded-pill"
                style={{ backgroundColor: "#229C47", border: "none" }}
                onClick={()=>navigate('/home')}
              >
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
