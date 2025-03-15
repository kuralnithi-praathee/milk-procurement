import React from "react";
import { InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function Searchbar({ searchQuery, handleChange }) {
  return (
    <InputGroup
      style={{
        maxWidth: "30%",
        border: "2px solid #229C47",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Form.Control
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleChange}
        style={{ border: "none", boxShadow: "none" }}
      />
      <InputGroup.Text
        style={{
          backgroundColor: "#229C47",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        <FaSearch />
      </InputGroup.Text>
    </InputGroup>
  );
}
