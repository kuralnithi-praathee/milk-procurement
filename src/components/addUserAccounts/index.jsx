import React from "react";
import { Card, Container, Form, InputGroup, Row, Col } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import { FaPhone, FaIdBadge, FaEdit } from "react-icons/fa";

// Dummy Data Array
const users = [
  {
    id: "123456",
    name: "John Doe",
    photo: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    phone: "+1 234 567 890",
    address: "123 Main St, Palakkad",
    location: "Mankavu, Palakkad",
  },
  {
    id: "789012",
    name: "Jane Smith",
    photo: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    phone: "+1 987 654 321",
    address: "456 Elm St, Kochi, Kerala, India - 682001",
    location: "Kochi, Kerala",
  },
  {
    id: "345678",
    name: "Mike Johnson",
    photo: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    phone: "+1 456 789 012",
    address: "789 Oak St, Trivandrum, Kerala, India - 695001, Near Technopark, Opposite Infosys Campus",
    location: "Trivandrum, Kerala",
  },
];

export default function Index() {
  return (
    <Container fluid className="mt-4">
      {/* Search Bar */}
      <InputGroup className="mb-3" style={{ maxWidth: "30%" }}>
        <Form.Control
          type="text"
          placeholder="Search user..."
          style={{ borderRadius: "8px" }}
        />
      </InputGroup>

      {/* User Cards Grid - Responsive */}
      <Row className="g-3">
        {users.map((user, index) => (
          <Col xs={12} sm={6} md={4} key={index}>
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// User Card Component
function UserCard({ user }) {
  return (
    <Card
      style={{
        borderRadius: "12px",
        position: "relative",
        boxShadow: "0px 4px 8px #00000040",
        minHeight: "250px", // Set a minimum height for consistency
        maxHeight: "300px", // Prevent excessive expansion
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Edit Icon (Top-Right Corner) */}
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
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
          <h5 className="mb-1">{user.name}</h5>
          <small className="text-muted">
      ID: {user.id}
          </small>
        </div>
      </div>

      {/* Contact & Address Details */}
      <div
        className="px-3 pb-3 mt-2"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems:"flex-start"
        }}
      >
        <p className="mb-2" >
          <FaPhone className="me-2" /><span style={{color:"#1E4FCB"}}>{user.phone} </span> 
        </p>
        <div
  style={{
    maxHeight: "100px", // Allows up to 2 lines of address
    overflowY: "auto", // Enables scrolling for long addresses
    wordBreak: "break-word", // Ensures long words wrap properly
    whiteSpace: "normal", // Allows text to wrap naturally
    textAlign: "left", // Ensures proper alignment
    display: "flex",
    alignItems: "start", // Aligns text with the icon
    gap: "5px", // Adds spacing between the icon and text
  }}
>
  <div>
  <CiLocationOn className="me-2" />
  </div>
  <span style={{ flex: 1 }}>{user.address}</span>
</div>

      </div>
    </Card>
  );
}
