import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import "./orderAssigned.css";
import SubmitButton from "../../common/button/submitButton";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmation() {

  const navigate =useNavigate()
  const handleSubmit = () =>{

navigate('/orders')

  }
  return (
    <Container className="confirmation-container d-flex justify-content-center align-items-center">
      {/* Card with Glassmorphism Effect */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6 }}
      >
        <Card className="order-card shadow-lg p-5 text-center">
          {/* Animated Check Icon */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <FaCheckCircle className="check-icon" />
          </motion.div>

          {/* Order Assigned Text */}
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-success mt-3 fw-bold"
          >
            Order Assigned Successfully!
          </motion.h3>

          {/* <p className="text-muted">Your order has been assigned and is now being processed.</p> */}

          {/* Done Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* <Button className="done-btn mt-3 px-4">Done</Button> */}
         <div style={{display:"flex",justifyContent:"center",padding:20}}>
          
           <SubmitButton handleSubmit={handleSubmit} title={"Done"}/>
          </div>  
          
          </motion.div>
        </Card>
      </motion.div>
    </Container>
  );
}
