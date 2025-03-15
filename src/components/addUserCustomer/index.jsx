import React, { useState } from "react";
import { Card, Container, Form, InputGroup, Row, Col, Modal, Button } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import { FaPhone, FaEdit, FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Dummy Data Array
const usersData = [
  {
    id: "123456",
    name: "John Doe",
    photo: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000",
    phone: "+1 234 567 890",
    address: "123 Main St, Palakkad",
    location: "Mankavu, Palakkad",
  },
  {
    id: "789012",
    name: "Jane Smith",
    photo: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000",
    phone: "+1 987 654 321",
    address: "456 Elm St, Kochi, Kerala, India - 682001",
    location: "Kochi, Kerala",
  },
  {
    id: "345678",
    name: "Mike Johnson",
    photo: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000",
    phone: "+1 456 789 012",
    address: "789 Oak St, Trivandrum, Kerala, India - 695001",
    location: "Trivandrum, Kerala",
  },
];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();

  // Filter users based on search input
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal with user details for date selection
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate(""); // Reset selected date
  };

  // Handle "Continue" button click
  const handleContinue = () => {
    if (selectedDate) {
      console.log(`Selected delivery date for ${selectedUser.name}: ${selectedDate}`);
      setShowModal(false);
      navigate('/productList');
    } else {
      alert("Please select a delivery date.");
    }
  };

  return (
    <Container fluid className="mt-4">
      {/* Search Bar */}
      <div className="d-flex justify-content-start mb-3">
        <InputGroup className="mb-3" style={{ maxWidth: "30%" }}>
          <Form.Control
            type="text"
            placeholder="Search user..."
            style={{ borderRadius: "8px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* User Cards Grid */}
      <Row className="g-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <Col xs={12} sm={6} md={4} key={index}>
              <UserCard user={user} onCardClick={() => handleOpenModal(user)} navigate={navigate} />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <p className="text-muted text-center">No users found.</p>
          </Col>
        )}
      </Row>

      {/* Modal for Delivery Date Selection */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Delivery Date for {selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Date Picker */}
            <Form.Group>
              <Form.Label>Select a Date:</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // Restrict to today or future dates
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleContinue}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

// User Card Component
function UserCard({ user, onCardClick, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      onClick={onCardClick}
    >
      <Card
        style={{
          borderRadius: "12px",
          position: "relative",
          boxShadow: "0px 4px 8px #00000040",
          minHeight: "250px",
          maxHeight: "300px",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          border: "2px solid #229C47", // ✅ Added Green Border
          padding: "15px",
        }}
      >
        {/* Edit & Wallet Icons */}
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            display: "flex",
            gap: "10px",
          }}
        >
          {/* Edit Icon */}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.2 }}
            transition={{ duration: 0.2 }}
            style={{ cursor: "pointer", color: "#229C47" }}
          >
            <FaEdit
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                navigate("/adduser-customer-form");
              }}
            />
          </motion.div>

          {/* Wallet Icon */}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.2 }}
            transition={{ duration: 0.2 }}
            style={{ cursor: "pointer", color: "#229C47" }}
          >
            <FaWallet
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                navigate("/wallet");
              }}
            />
          </motion.div>
        </div>

        {/* User Details */}
        <div className="p-3" style={{ textAlign: "left", gap: "15px",display:"flex",flexDirection:"column",justifyContent:"center" }}>
          <h5>{user.name}</h5>
          <div className="text-muted">ID: {user.id}</div>
          <div className="text-muted">
            <FaPhone className="me-1" />
            <span style={{ color: "#1E4FCB" }}>{user.phone}</span>
          </div>
          <div className="text-muted">
            <CiLocationOn className="me-1" />
            <span>{user.address}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
