import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsBox } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { motion } from "framer-motion"; // Import Framer Motion

// Updated User Data with Routes
const products = [
  { type: "Product List", quantity: 25, icon: <BsBox size={20} />, route: "/productList-view" },
  { type: "Stock management", quantity: 40, icon: <GoGraph size={20} />, route: "/stockManagement" },
];

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (index, route) => {
    setActiveIndex(index); // Change background color
    setTimeout(() => navigate(route), 150); // Delay navigation slightly
  };

  return (
    <Container fluid className="mt-4">
      <Row className="g-3">
        {products.map((product, index) => (
          <Col xs={12} sm={6} md={4} key={index}>
            <UserCard
              product={product}
              isActive={activeIndex === index}
              onClick={() => handleCardClick(index, product.route)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// User Card Component with Framer Motion
function UserCard({ product, isActive, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Slight zoom effect on hover
      whileTap={{ scale: 0.95 }} // Small press effect
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0px 4px 8px #00000040",
          minHeight: "150px",
          backgroundColor: "#FFFFFF",
          border: "2px solid #DDDDDD", // Add border
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 20,
          transition: "background-color 0.2s ease-in-out",
          position: "relative",
        }}
      >
        {/* Top-right Corner Triangle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 0,
            height: 0,
            borderLeft: "40px solid transparent",
            borderTop: "40px solid #229C47",
          }}
        ></div>

        {/* Quantity */}
        <div style={{ color: "#5B5B5B", fontWeight: "bold", fontSize: "20px" }}>
          {product.quantity}
        </div>

        {/* User Type & Icon */}
        <div
          style={{
            color: "#5B5B5B",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 500,

            
          }}
        >
          <span>{product.type}</span>
          {product.icon}
        </div>
      </Card>
    </motion.div>
  );
}
