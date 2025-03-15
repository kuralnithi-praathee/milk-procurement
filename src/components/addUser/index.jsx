import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { FaUsers, FaMoneyCheckAlt } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import './MilkAnimation.css'
// Users Data with Routes
const users = [
  { type: "Driver", quantity: 25, icon: <FiTruck size={24} />, route: "/adduser-driver" },
  { type: "Customer", quantity: 40, icon: <FaUsers size={24} />, route: "/adduser-customers" },
  { type: "Sales", quantity: 15, icon: <FaMoneyCheckAlt size={24} />, route: "/adduser-sales" },
  { type: "Accounts", quantity: 10, icon: <IoReceiptOutline size={24} />, route: "/adduser-accounts" },
];

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (index, route) => {
    setActiveIndex(index);
    setTimeout(() => navigate(route), 200);
  };

  return (
    <motion.div
      className="milk-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Milk Pour Animation */}
      

      {/* User Cards */}
      <Container fluid className="mt-5">
        <Row className="g-4 pt-3">
          {users.map((user, index) => (
            <Col xs={12} sm={6} md={4} key={index}>
              <UserCard
                user={user}
                isActive={activeIndex === index}
                onClick={() => handleCardClick(index, user.route)}
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Bottom Milk Wave */}
      <motion.div
        className="milk-wave"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      />
    </motion.div>
  );
}

// User Card Component with Animation
function UserCard({ user, isActive, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="card-container"
    >
      <Card style={{cursor:"pointer"}} className={`user-card ${isActive ? "active" : ""}`}>
        {/* Top-Right Corner Accent */}
        <div className="corner-accent"></div>

        {/* Card Content */}
        <div className="quantity" style={{textAlign:"left"}}>{user.quantity}</div>
        <div className="user-info">
          <span>{user.type}</span>
          {user.icon}
        </div>
      </Card>
    </motion.div>
  );
}
