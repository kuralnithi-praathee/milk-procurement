import React from "react";
import { Container, Card, Button, Form, Table } from "react-bootstrap";
import { motion } from "framer-motion";
import "./wallet.css";

export default function Index() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Container className="mt-5">
        {/* Wallet Balance Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card style={{
    background: "linear-gradient(45deg, #229C47, #1A7F37)", // Correct syntax
    color: "white", // Ensure text visibility on dark background
          }}
          className="wallet-card glassmorphism p-4 mx-auto">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold text-white">Periyasami</h4>
              <span className="fw-bold text-light">#85782</span>
            </div>
            <h6 className="mt-3 text-white-50">Wallet Balance</h6>
            <h2 className="fw-bold text-white">₹ 5000</h2>
          </Card>
        </motion.div>

        {/* Add Money Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 mx-auto add-money"
        >
          <h5 className="fw-bold">Add Money</h5>
          <Form className="d-flex gap-2">
            <Form.Control type="text" placeholder="₹ 5000" className="shadow-sm" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="add-btn"
              style={{color:"#ffff"}}
            >
              Add
            </motion.button>
          </Form>
        </motion.div>

        {/* Transaction History Table */}
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 80, duration: 0.6 }}
          className="mt-5 mx-auto transactions"
        >
          <h5 className="fw-bold">Transaction History</h5>
          <Table bordered hover responsive className="shadow-sm mt-3">
            <thead className="table-header">
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {["10 Mar 2025", "09 Mar 2025", "08 Mar 2025", "07 Mar 2025"].map(
                (date, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <td>{index + 1}</td>
                    <td className="fw-bold text-success">₹300</td>
                    <td>{date}</td>
                    <td>
                      <span className="text-primary fw-bold">Completed</span>
                    </td>
                  </motion.tr>
                )
              )}
            </tbody>
          </Table>
        </motion.div>
      </Container>
    </motion.div>
  );
}
