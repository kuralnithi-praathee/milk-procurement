import React, { useState } from "react";
import { Container, Card, Form, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import './customer.css'
import SubmitButton from "../../common/button/submitButton";
import { useNavigate } from "react-router-dom";
const customers = [
  { name: "Peter", id: "20250001" },
  { name: "Jerry", id: "20250002" },
  { name: "Tom", id: "20250003" },
  { name: "Holland", id: "20250004" },
];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Container className="mt-5">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Form className="mb-4">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <Form.Control
              type="text"
              placeholder="Search for Customer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Form>
      </motion.div>

      {/* Customer List */}
      <Row className="g-4">
        {filteredCustomers.map((customer, index) => (
          <Col md={6} lg={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card className="customer-card shadow-sm p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{customer.name}</h5>
                  <span className="text-muted">ID: {customer.id}</span>
                </div>
                <motion.a
                  href="/recurring-order-view"
                  className="view-more"
                  whileHover={{ x: 5 }}
                  style={{textAlign:'left',paddingTop:20}}
                >
                  View More &gt;
                </motion.a>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
