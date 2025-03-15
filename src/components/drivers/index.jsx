import React, { useState } from "react";
import { Card, Container, Form, InputGroup, Row, Col } from "react-bootstrap";
import { CiRoute } from "react-icons/ci";
import { FaPhone, FaEdit, FaTruckMoving } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { motion } from "framer-motion";
import SubmitButton from "../../common/button/submitButton";
import { useNavigate } from "react-router-dom";

// Dummy Data Array
const users = [
  {
    id: "123456",
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    phone: "+1 234 567 890",
    vehicle: "Tesla Model S",
    regNumber: "ABC 1234",
    location: "Mankavu, Palakkad",
  },
  {
    id: "789012",
    name: "Jane Smith",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    phone: "+1 987 654 321",
    vehicle: "Ford Mustang",
    regNumber: "XYZ 5678",
    location: "Kochi, Kerala",
  },
  {
    id: "345678",
    name: "Mike Johnson",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    phone: "+1 456 789 012",
    vehicle: "Chevrolet Camaro",
    regNumber: "LMN 9012",
    location: "Trivandrum, Kerala",
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate()

  const handleContinue =() =>{

navigate('/view-product')

  }
  return (
    <Container fluid className="mt-4">
      {/* Search Bar */}
      <InputGroup className="mb-3" style={{ maxWidth: "30%" }}>
        <Form.Control
          type="text"
          placeholder="Search user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ borderRadius: "8px" }}
        />
      </InputGroup>

      {/* User Cards Grid - Responsive */}
      <Row className="g-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Col xs={12} sm={6} md={4} key={user.id}>
              <UserCard
                user={user}
                selected={selectedUser === user.id}
                onSelect={() => setSelectedUser(user.id)}
              />
            </Col>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>No users found</p>
        )}
      </Row>

      <motion.div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
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

// User Card Component
function UserCard({ user, selected, onSelect }) {
  return (
    <Card
      style={{
        borderRadius: "12px",
        position: "relative",
        boxShadow: selected ? "0px 4px 8px #229C47" : "0px 4px 8px #00000040",
        border: selected ? "2px solid #229C47" : "none",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={onSelect}
    >
      {/* Edit Icon (Top-Right Corner) */}
      <div className="d-flex justify-content-center mt-2">
        <Form.Check
          type="radio"
          name="userSelection"
          checked={selected}
          onChange={onSelect}
          style={{
            transform: "scale(1.3)",
            accentColor: "#229C47",
          }}
        />
      </div>
      <FaEdit
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
        <div>
          <h5 className="mb-1">{user.name}</h5>
          <small className="text-muted">ID: {user.id}</small>
        </div>
      </div>

      {/* Contact & Vehicle Details */}
      <div className="px-3 pb-3">
        
        <p className="mb-2 "style={{textAlign:"left"}}>
          <FaPhone className="me-2" /> <span style={{ color: "#1E4FCB" }}>{user.phone}</span>
        </p>
        <p className="mb-2"  style={{textAlign:"left"}}> 
          <FaTruckMoving className="me-2" /> {user.vehicle}
        </p>
        <p className="mb-0" style={{textAlign:"left"}}>
          <HiOutlineIdentification className="me-2" /> {user.regNumber}
        </p>
      </div>

      {/* Location Footer */}
      <div
        className="p-2 mt-4"
        style={{
          backgroundColor: "#229C47",
          color: "#FFFFFF",
          borderRadius: "0px 0px 10px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <CiRoute size={20} />
        <span>{user.location}</span>
      </div>

      {/* Radio Button */}
    
    </Card>
  );
}
