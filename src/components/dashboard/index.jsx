import React, { useState } from "react";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FaBox, FaShippingFast, FaClock, FaTimesCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(null);

  // Card Data
  const orderData = [
    { id: 1, title: "Total Orders", value: 158, icon: <FaBox /> },
    { id: 2, title: "Delivered Orders", value: 158, icon: <FaShippingFast /> },
    { id: 3, title: "Pending Orders", value: 158, icon: <FaClock /> },
    { id: 4, title: "Cancelled Orders", value: 158, icon: <FaTimesCircle /> },
  ];

  // Chart Data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [200, 300, 500, 250, 400, 350, 450],
        borderColor: "#229C47",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "#229C47",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };

  return (
    <Container className="mt-5">
      {/* Order Cards */}
      <Row className="g-4 p-5">
        {orderData.map((item) => (
          <Col md={3} sm={6} key={item.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: item.id * 0.1 }}
            >
              <Card
                className={`order-card ${selectedCard === item.id ? "selected-card" : ""}`}
                onClick={() => setSelectedCard(item.id)}
              >
                <Card.Body className="position-relative">
                  {/* Top Right Icon */}
                  <div className="order-card-icon">{item.icon}</div>

                  {/* Order Number */}
                  <h2 className="fw-bold">{item.value}</h2>
                  <p className="text-muted">{item.title}</p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Sales Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-5"
      >
        <Card className="shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold">Sales Analytics</h5>
            <Dropdown>
              <Dropdown.Toggle variant="success" className="dropdown-toggle">
                Weekly
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Daily</Dropdown.Item>
                <Dropdown.Item>Weekly</Dropdown.Item>
                <Dropdown.Item>Monthly</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="chart-container">
            <Line data={data} options={options} />
          </div>
        </Card>
      </motion.div>
    </Container>
  );
}
