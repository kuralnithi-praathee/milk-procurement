import React, { useState } from "react";
import { Navbar, Container, Breadcrumb, Button, Nav } from "react-bootstrap";
import { MdNavigateNext, MdAdd } from "react-icons/md";
import { cssProperties } from "../utils/commonCssProperties";
import { FaPlus, FaRegCalendarAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles


export default function Header({ breadcrumbs, onAddClick }) {

  //calender
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
//................

  console.log('location.pathname--',location.pathname);
  

  const navigate = useNavigate();


  return (
    <Navbar
      bg="white"
      fixed="top"
      style={{
        width: `calc(100% - ${cssProperties?.drawerWidth}px)`, // Adjust for sidebar
        marginLeft: `${cssProperties?.drawerWidth}px`, // Sidebar offset
        border: "none",
        backgroundColor: cssProperties?.backgroundcolor?.white,
        zIndex: 1, // Ensures it's on top
        padding: "10px 20px",
        boxShadow: "",

        borderBottom: "1px", // Ensures no border at the bottom
      }}
    >
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Breadcrumbs */}
        <CommonBreadcrumb breadcrumbs={breadcrumbs} />

        {/* Plus Icon Button (Styled with Black Shadow) */}
        {location.pathname == '/adduser-driver-form' && 
        <div style={{ position: "relative" }}>
        <Button
          onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%", // Circular button
            backgroundColor: "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 6px 0px #00000040",
          }}
        >
          <FaRegCalendarAlt size={30} color="#229C47" />
        </Button>

        {/* Show DatePicker when button is clicked */}
        {showCalendar && (
          <div style={{ position: "absolute", top: "60px",right:"10px", zIndex: 1000 }}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setShowCalendar(false); // Hide calendar after selecting date
              }}
              inline
            />
          </div>
        )}
      </div>
        }



        {location.pathname == '/adduser-driver' && 
        <Nav.Link
        
        onClick={() => navigate('/adduser-driver-form')}
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%", // Makes it circular
            backgroundColor: "white", // Background remains white
            border: "none", // No solid border
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             // Remove extra padding
            boxShadow: "0px 4px 6px 0px #00000040"
        }}
        >
      <FiPlus      size={30} color="#229C47" />
        </Nav.Link>}
        {location.pathname == '/adduser-customers' && 
        <Nav.Link
        
        onClick={() => navigate('/adduser-customer-form')}
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%", // Makes it circular
            backgroundColor: "white", // Background remains white
            border: "none", // No solid border
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             // Remove extra padding
            boxShadow: "0px 4px 6px 0px #00000040"
        }}
        >
      <FiPlus      size={30} color="#229C47" />
        </Nav.Link>}
        {location.pathname == '/adduser-sales' && 
        <Nav.Link
        
        onClick={() => navigate('/adduser-sales-form')}
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%", // Makes it circular
            backgroundColor: "white", // Background remains white
            border: "none", // No solid border
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             // Remove extra padding
            boxShadow: "0px 4px 6px 0px #00000040"
        }}
        >
      <FiPlus      size={30} color="#229C47" />
        </Nav.Link>}
        {location.pathname == '/productList' && 
        <Nav.Link
        
        onClick={() => navigate('/add-product-form')}
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%", // Makes it circular
            backgroundColor: "white", // Background remains white
            border: "none", // No solid border
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             // Remove extra padding
            boxShadow: "0px 4px 6px 0px #00000040"
        }}
        >
      <FiPlus      size={30} color="#229C47" />
        </Nav.Link>}
        {location.pathname == '/productList-view' && 
        <Nav.Link
        
        onClick={() => navigate('/add-product-form')}
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%", // Makes it circular
            backgroundColor: "white", // Background remains white
            border: "none", // No solid border
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             // Remove extra padding
            boxShadow: "0px 4px 6px 0px #00000040"
        }}
        >
      <FiPlus      size={30} color="#229C47" />
        </Nav.Link>}
        {location.pathname == '/adduser-accounts' && 
        <Nav.Link
        
        onClick={() => navigate('/adduser-accounts-form')}
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%", // Makes it circular
            backgroundColor: "white", // Background remains white
            border: "none", // No solid border
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             // Remove extra padding
            boxShadow: "0px 4px 6px 0px #00000040"
        }}
        >
      <FiPlus      size={30} color="#229C47" />
        </Nav.Link>}
        {location.pathname == '/drivers-list' && 
        <Nav.Link
        
        onClick={() => navigate('/adduser-drivers-form')}
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%", // Makes it circular
            backgroundColor: "white", // Background remains white
            border: "none", // No solid border
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             // Remove extra padding
            boxShadow: "0px 4px 6px 0px #00000040"
        }}
        >
      <FiPlus      size={30} color="#229C47" />
        </Nav.Link>}
        {location.pathname == '/adduser-accounts' && 
        <Nav.Link
        
        onClick={() => navigate('/adduser-accounts-form')}
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%", // Makes it circular
            backgroundColor: "white", // Background remains white
            border: "none", // No solid border
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             // Remove extra padding
            boxShadow: "0px 4px 6px 0px #00000040"
        }}
        >
      <FiPlus      size={30} color="#229C47" />
        </Nav.Link>}



      </Container>
    </Navbar>
  );
}

function CommonBreadcrumb({ breadcrumbs }) {
  return (
    <Breadcrumb className="mb-0 d-flex align-items-center pt-5">
      {breadcrumbs?.map((crumb, index) => (
        <span key={index} style={{ display: "flex", alignItems: "center" }}>
          <Breadcrumb.Item
            active={index === breadcrumbs.length - 1}
            href={index !== breadcrumbs.length - 1 ? crumb.path : undefined}
            style={{ textDecoration: "none", color: "inherit",fontWeight:`${crumb?.font}` }} // Removes underline
            className="breadcrumb-link"
          >
            {crumb.name}
          </Breadcrumb.Item>

          {/* Right Arrow Between Items (Except Last One) */}
          {index !== breadcrumbs.length - 1 && (
            <MdNavigateNext size={20} className="mx-2 text-muted" />
          )}
        </span>
      ))}
    </Breadcrumb>
  );
}
