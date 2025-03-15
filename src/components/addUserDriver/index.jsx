import React, { useState } from "react";
import { Card, Container, Form, InputGroup, Row, Col } from "react-bootstrap";
import { CiRoute } from "react-icons/ci";
import { FaPhone, FaTruckMoving, FaEdit } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { motion } from "framer-motion"; // Import Framer Motion
import { useNavigate } from "react-router-dom";

// Dummy Data
const usersData = [
  {
    id: "123456",
    name: "John Doe",
    photo: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    phone: "+1 234 567 890",
    vehicle: "Tesla Model S",
    regNumber: "ABC 1234",
    location: "Mankavu, Palakkad",
  },
  {
    id: "789012",
    name: "Jane Smith",
    photo: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    phone: "+1 987 654 321",
    vehicle: "Ford Mustang",
    regNumber: "XYZ 5678",
    location: "Kochi, Kerala",
  },
  {
    id: "345678",
    name: "Mike Johnson",
    photo: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    phone: "+1 456 789 012",
    vehicle: "Chevrolet Camaro",
    regNumber: "LMN 9012",
    location: "Trivandrum, Kerala",
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search input
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

const navigate = useNavigate()

  return (
    <Container fluid className="mt-4">
      {/* Search Bar Positioned to the Right */}
      <div className="d-flex justify-content-start mb-3">
        <InputGroup style={{ maxWidth: "40%" }}>
          <Form.Control
            type="text"
            placeholder="Search user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              borderRadius: "8px",
              border: "1px solid #229C47",
              padding: "10px",
            }}
          />
        </InputGroup>
      </div>

      {/* User Cards Grid - Responsive */}
      <Row className="g-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <Col xs={12} sm={6} md={4} key={index}>
              <UserCard navigate={navigate} user={user} />
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No users found.</p>
        )}
      </Row>
    </Container>
  );
}

// User Card Component with Framer Motion
function UserCard({ user,navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Fade-in animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }} // Smooth hover effect
    >
      <Card
        style={{
          borderRadius: "12px",
          position: "relative",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)", // Soft shadow
          minHeight: "280px",
        }}
      >
        {/* Edit Icon */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            cursor: "pointer",
            color: "#229C47",
          }}
        >
          <FaEdit
                  onClick={()=>navigate('/adduser-driver-form')}

          size={18} />
        </motion.div>

        {/* Profile Section */}
        <div className="d-flex align-items-center p-3">
          <img
            src={user.photo}
            alt={user.name}
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "15px",
              border: "3px solid #229C47",
            }}
          />
          <div>
            <h6 className="mb-1" style={{ fontWeight: "600" }}>{user.name}</h6>
            <small className="text-muted">ID: {user.id}</small>
          </div>
        </div>

        {/* Contact & Vehicle Details */}
        <div className="px-3 pb-2">
          <p className="mb-2" style={{textAlign:"left"}}>
            <FaPhone className="me-2" /> <span style={{ color: "#1E4FCB" }}>{user.phone}</span>
          </p>
          <p className="mb-2" style={{textAlign:"left"}}>
            <FaTruckMoving className="me-2" /> {user.vehicle}
          </p>
          <p className="mb-0" style={{textAlign:"left"}}>
            <HiOutlineIdentification className="me-2" /> {user.regNumber}
          </p>
        </div>

        {/* Location Footer */}
        <div
          // whileHover={{ scale: 1.05 }} // Hover animation for location bar
          className="p-2 mt-5"
          style={{
            backgroundColor: "#229C47",
            color: "#FFFFFF",
            borderRadius: "0px 0px 10px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <CiRoute size={20} />
          <span>{user.location}</span>
        </div>
      </Card>
    </motion.div>
  );
}
