import React, { useState } from "react";
import { Card, Container, Form, InputGroup, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";

// Dummy Data Array
const products = [
  {
    name: "Watch",
    weight: "220 g",
    quantity: 0,
    photo: "https://cdn.firstcry.com/education/2022/11/07145239/Dairy-Product-List-For-Kids-with-their-Benefits-And-Facts.jpg",
  },
  {
    name: "Headphone",
    weight: "300 g",
    quantity: 0,
    photo: "https://cdn.firstcry.com/education/2022/11/07145239/Dairy-Product-List-For-Kids-with-their-Benefits-And-Facts.jpg",
  },
  {
    name: "Camera",
    weight: "500 g",
    quantity: 0,
    photo: "https://cdn.firstcry.com/education/2022/11/07145239/Dairy-Product-List-For-Kids-with-their-Benefits-And-Facts.jpg",
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="mt-4">
      <InputGroup className="mb-3" style={{ maxWidth: "30%" }}>
        <Form.Control
          type="text"
          placeholder="Search stocks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ borderRadius: "8px" }}
        />
      </InputGroup>

      <Row className="g-4 p-2">
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
    </Container>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState("");

  return (
    <div style={{ position: "relative" }}>
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0px 4px 8px #00000040",
          minHeight: "250px",
          maxHeight: "400px",
          position: "relative",
        }}
      >
        <div className="d-flex align-items-center justify-content-center p-3 position-relative">
          <img
            src={product.photo}
            alt={product.name}
            style={{
              width: "180px",
              height: "150px",
              borderRadius: "5%",
              objectFit: "cover",
            }}
          />
          
          {product.quantity === 0 && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(255, 255, 255, 0.9)",
                color: "red",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "5px 15px",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              Out Of Stock
            </div>
          )}
        </div>

        <div className="px-3 pb-3">
          <div style={{ fontWeight: 500, fontSize: "18px" }}>{product?.name}</div>
          <div className="pt-1">
            <div className="d-flex justify-content-between">
              <span style={{ fontWeight: 500, fontSize: "14px", color: "#5B5B5B" }}>Weight</span>
              <span style={{ fontWeight: 500, fontSize: "14px" }}>{product?.weight}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span style={{ fontWeight: 500, fontSize: "14px", color: "#5B5B5B" }}>Quantity</span>
              <span style={{ fontWeight: 500, fontSize: "14px" }}>{product?.quantity}</span>
            </div>
          </div>
        </div>

        <div style={{ padding: 5 }}>
          <div
            className="p-2 mt-2"
            style={{
              backgroundColor: "#229C47",
              color: "#FFFFFF",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              width: "100%",
              height: "40px",
            }}
            onClick={() => setShowModal(true)}
          >
            Add Stock
          </div>
        </div>

        {/* Small Popup Centered on the Card */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "12%",
              transform: "translate(-50%, -50%)",
              background: "#fff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              padding: "10px",
              borderRadius: "8px",
              width: "180px",
              zIndex: 10,
              textAlign: "center",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "5px" }}>
              Add Stock
            </div>
            <Form.Group>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                style={{ textAlign: "center", fontSize: "12px", padding: "5px" }}
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: "#229C47", fontSize: "12px", padding: "5px" }}
              className="mt-2 w-100"
              onClick={() => {
                console.log(`Added ${quantity} ${product.name}`);
                setShowModal(false);
              }}
              disabled={!quantity || quantity < 1}
            >
              Enter
            </Button>
            <Button
              variant="secondary"
              className="mt-1 w-100"
              onClick={() => setShowModal(false)}
              size="sm"
              style={{ fontSize: "12px", padding: "5px" }}
            >
              Cancel
            </Button>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
