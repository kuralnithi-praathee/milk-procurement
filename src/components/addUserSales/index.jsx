import React, { useState } from "react";
import { Card, Container, Form, InputGroup, Row, Col } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import { FaPhone, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import { useNavigate } from "react-router-dom";

// Dummy Data Array
const usersData = [
  {
    id: "123456",
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    phone: "+1 234 567 890",
    address: "123 Main St, Palakkad",
    location: "Mankavu, Palakkad",
  },
  {
    id: "789012",
    name: "Jane Smith",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    phone: "+1 987 654 321",
    address: "456 Elm St, Kochi, Kerala, India - 682001",
    location: "Kochi, Kerala",
  },
  {
    id: "345678",
    name: "Mike Johnson",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    phone: "+1 456 789 012",
    address: "789 Oak St, Trivandrum, Kerala, India - 695001, Near Technopark, Opposite Infosys Campus",
    location: "Trivandrum, Kerala",
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search
  
  // Filter users based on search input
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery) ||
    user.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const navigate = useNavigate()
  return (
    <Container fluid className="mt-4">
      {/* Search Bar */}
      <InputGroup className="mb-3" style={{ maxWidth: "30%" }}>
        <Form.Control
          type="text"
          placeholder="Search user..."
          style={{ borderRadius: "8px" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {/* User Cards Grid - Responsive */}
      <Row className="g-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <Col xs={12} sm={6} md={4} key={index}>
              <UserCard navigate={navigate} user={user} />
              </Col>
          ))
        ) : (
          <p className="text-muted text-center">No users found</p>
        )}
      </Row>
    </Container>
  );
}

// User Card Component with Framer Motion Animations
function UserCard({ user,navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Animate from below with fade-in
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} // Smooth exit animation
      whileHover={{ scale: 1.03 }} // Hover effect
      transition={{ duration: 0.3 }}
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
        }}
      >
        {/* Edit Icon (Top-Right Corner) */}
        <FaEdit
                          onClick={()=>navigate('/adduser-sales-form')}

          size={18}
          className="text-muted"
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            cursor: "pointer",
            color: "#229C47",
          }}
        />

        {/* Top Section: Photo, Name, and ID */}
        <div className="d-flex align-items-center p-3">
          <img
            src={user.photo}
            alt={user.name}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "15px",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h5 className="mb-1">{user.name}</h5>
            <small className="text-muted">ID: {user.id}</small>
          </div>
        </div>

        {/* Contact & Address Details */}
        <div
          className="px-3 pb-3 mt-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <p className="mb-2">
            <FaPhone className="me-2" />
            <span style={{ color: "#1E4FCB" }}>{user.phone}</span>
          </p>
          <div
            style={{
              maxHeight: "100px",
              overflowY: "auto",
              wordBreak: "break-word",
              whiteSpace: "normal",
              textAlign: "left",
              display: "flex",
              alignItems: "start",
              gap: "5px",
            }}
          >
            <CiLocationOn className="me-2" />
            <span style={{ flex: 1 }}>{user.address}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
