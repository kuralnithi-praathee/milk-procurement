import React, { useState } from "react";
import { Card, Container, Form, InputGroup, Row, Col, Button, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import SubmitButton from "../../common/button/submitButton";

// Dummy Data Array
const products = [
  { name: "sample", weight: "220 g", quantity: 2, photo: "https://cdn.firstcry.com/education/2022/11/07145239/Dairy-Product-List-For-Kids-with-their-Benefits-And-Facts.jpg" },
  { name: "sample", weight: "300 g", quantity: 0, photo: "https://cdn.firstcry.com/education/2022/11/07145239/Dairy-Product-List-For-Kids-with-their-Benefits-And-Facts.jpg" },
  { name: "sample", weight: "500 g", quantity: 5, photo: "https://cdn.firstcry.com/education/2022/11/07145239/Dairy-Product-List-For-Kids-with-their-Benefits-And-Facts.jpg" },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState(""); // Selected Shift
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const recurring = searchParams.get("recurring");



  // Filter products based on searchQuery
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
  

    if (!selectedShift) {
      alert("Please select a shift before continuing.");
      return;
    }
    
    setShowModal(false);
    navigate("/order-assigned");
  };

  const handleContinueOutSide = () => {
  if(recurring==1){

    navigate("/order-assigned");
  }
    setShowModal(true);
  };

  return (
    <Container fluid className="mt-4">
      {/* Search Bar with Motion Effect */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <InputGroup className="mb-3" style={{ maxWidth: "30%" }}>
          <Form.Control
            type="text"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderRadius: "8px" }}
          />
        </InputGroup>
      </motion.div>

      {/* Product Cards Grid */}
      <Row className="g-5 p-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Col xs={12} sm={6} md={3} key={index}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>No products found</p>
        )}
      </Row>

      {/* Floating Continue Button - Opens Shift Selection Modal */}
      <motion.div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        onClick={handleContinueOutSide}
      >
        <SubmitButton title={"Continue"} />
      </motion.div>

      {/* Shift Selection Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Shift</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["Shift 1", "Shift 2", "Shift 3"].map((shift, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={shift}
                name="shift"
                value={shift}
                onChange={(e) => setSelectedShift(e.target.value)}
                checked={selectedShift === shift}
                className="mb-2"
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleContinue}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = (e) => {
    e.stopPropagation();
    setQuantity(quantity + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
      <Card
        style={{
          borderRadius: "12px",
          position: "relative",
          boxShadow: "0px 4px 8px #00000040",
          minHeight: "250px",
          maxHeight: "400px",
          border: `2px solid ${product.quantity === 0 ? "#ff4d4d" : "#229C47"}`, // Red for Out of Stock, Green for In Stock
        }}
      >
        <div className="d-flex align-items-center justify-content-center p-3 position-relative">
          <motion.img
            src={product.photo}
            alt={product.name}
            style={{
              width: "180px",
              height: "150px",
              borderRadius: "5%",
              objectFit: "cover",
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="px-3 pb-3">
          <div style={{ fontWeight: 500, fontSize: "18px", display: "flex" }}>{product?.name}</div>
          <div className="pt-1">
            <div className="d-flex justify-content-between">
              <span style={{ fontWeight: 500, fontSize: "14px", color: "#5B5B5B" }}>{product?.weight}</span>
              <span style={{ fontWeight: 500, fontSize: "14px" }}>price</span>
            </div>
          </div>
        </div>

        {/* Add/Subtract Button OR Out of Stock Label */}
        <div style={{ padding: 5 }}>
          {product.quantity === 0 ? (
            <div
              className="d-flex align-items-center justify-content-center p-2"
              style={{
                backgroundColor: "#ff4d4d",
                color: "#FFFFFF",
                borderRadius: "10px",
                width: "100%",
                height: "40px",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Out of Stock
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center p-2"
              style={{
                backgroundColor: "#229C47",
                color: "#FFFFFF",
                borderRadius: "10px",
                border: "2px solid #229C47",
                width: "100%",
                height: "40px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Button style={{ background: "transparent", border: "none", color: "white", fontSize: "18px", fontWeight: 500 }} onClick={handleDecrease}>
                -
              </Button>
              <span style={{ fontWeight: "bold", fontSize: "16px", margin: "0 15px" }}>{quantity}</span>
              <Button style={{ background: "transparent", border: "none", color: "white", fontSize: "18px", fontWeight: 500 }} onClick={handleIncrease}>
                +
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
