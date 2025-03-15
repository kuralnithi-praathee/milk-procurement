import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Sample Data
const orders = [
  { id: "123456", name: "John Doe", phone: "+1 234 567 890", address: "123 Main St, Palakkad", status: "total" },
  { id: "78912", name: "Jane Smith", phone: "+1 987 654 321", address: "456 Elm St, Kochi", status: "delivered" },
  { id: "345678", name: "Mike Johnson", phone: "+1 456 789 012", address: "789 Oak St, Trivandrum", status: "pending" },
  { id: "654321", name: "Alice Brown", phone: "+1 345 678 901", address: "101 Pine St, Chennai", status: "cancelled" },
];

export default function Index() {
  const [filter, setFilter] = useState("total");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    setFilteredOrders(orders.filter((order) => order.status === filter));
  }, [filter]);


const navigate =useNavigate()

  return (

    <Container className="mt-4">
      {/* Filter Buttons */}
      <motion.div className="d-flex gap-3 mb-4">
        {["total", "delivered", "pending", "cancelled"].map((status) => (
          <motion.button
            key={status}
            className={`btn ${filter === status ? "btn-success" : "btn-outline-success"}`}
            style={{ borderRadius: "21px", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => setFilter(status)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} Orders
          </motion.button>
        ))}
      </motion.div>

      {/* Orders Display */}
      <Row className="g-4">
        <h5 style={{ display: "flex", color: "#5B5B5B" }}>
          {filter === "total" ? "Total orders" : filter === "delivered" ? "Delivered orders" : filter === "pending" ? "Pending orders" : "Canceled orders"}
        </h5>
        {filteredOrders.map((order, index) => (
          <Col xs={12} md={4} key={order.id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <OrderCard order={order} filter={filter} navigate={navigate} />
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// Order Card Component
function OrderCard({ order, filter,navigate }) {
  return (
    <motion.div
    onClick={ filter === 'total' ?()=>navigate('/view-product' ):filter === 'delivered' ?()=>navigate('/view-product-delivered' ):filter === 'pending' ?()=>navigate('/view-product-pending'):filter === 'cancelled' ?()=>navigate('/view-product-canceled'):""}

      className="py-4 px-4 border rounded shadow-sm"
      style={{
        minHeight: "260px",
        minWidth: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fff",
        borderRadius: "12px",
        border: "2px solid #229C47", // Added green border
        gap: "15px", // Increased gap inside card
        padding: "20px",
        cursor:"pointer"
      }}
      whileHover={{ scale: 1.05 }}
    
    >
      {/* Name and ID */}
      <div 
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ fontWeight: 700, fontSize: "22px" }}>{order.name}</div>
        <div style={{ color: "#229C47", fontWeight: 500, fontSize: "14px" }}>{order.id}</div>
      </div>

      {/* Phone */}
      <div style={{ color: "#1E4FCB", fontWeight: 500, fontSize: "16px", marginBottom: "10px",textAlign:"left" }}>{order.phone}</div>

      {/* Address */}
      <div style={{ fontWeight: 500, fontSize: "16px", color: "#444", marginBottom: "20px",textAlign:"left" }}>{order.address}</div>

      {/* Status or View Link */}
      {filter === "total" ? (
        <a
          href={`/view-product`} // Change this to your actual order details page
          style={{
            fontWeight: 600,
            fontSize: "18px",
            color: "#007BFF",
            textDecoration: "none",
            marginTop: "10px",
            textAlign:"right"  
          }}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        
        >
          View
        </a>
      ) : (
        <div   className={`text-${getStatusColor(filter)}`} style={{ fontWeight: 600, fontSize: "18px", marginTop: "10px",textAlign:"right" }}>
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </div>
      )}
    </motion.div>
  );
}

// Function to map status to colors
function getStatusColor(status) {
  switch (status) {
    case "delivered":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "danger";
    default:
      return "primary";
  }
}
