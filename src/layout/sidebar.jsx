import React from "react";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { MdHomeFilled, MdOutlineVerifiedUser, MdOutlineLogout } from "react-icons/md";
import { FaShoppingCart, FaTruck, FaBoxOpen, FaUserPlus } from "react-icons/fa";
import { IoIosToday } from "react-icons/io";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { name: "Home", icon: <MdHomeFilled size={25} />, path: "/home" },
    { name: "Orders", icon: <FaShoppingCart size={25} />, path: "/orders" },
    { name: "Drivers", icon: <FaTruck size={25} />, path: "/drivers-list" },
    { name: "Products", icon: <FaBoxOpen size={25} />, path: "/products" },
    { name: "Add Users", icon: <FaUserPlus size={25} />, path: "/add-user" },
    { name: "Recurring", icon: <IoIosToday size={25} />, path: "/recurring-order" },
  ].map((item) => ({
    ...item,
    color: location.pathname === item.path ? "#229C47" : "#5B5B5B",
    backgroundColor: location.pathname === item.path ? "#D6F5E1" : "transparent",
  }));

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        width: "60px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#FFFFFF",
        borderRight: "1px solid #ddd",
      }}
    >
      {/* Fixed Logo Section */}
      <div style={{ width: "100%", paddingTop: "20px" }}>
        <OverlayTrigger placement="right" overlay={<Tooltip>Logo</Tooltip>}>
          <Nav.Link
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              width: "100%",
              height: "50px",
              cursor: "pointer",
              color: "#5B5B5B",
            }}
            onClick={() => console.log("logo clicked")}
          >
            <MdOutlineVerifiedUser size={25} />
            <span style={{ fontSize: "10px", marginTop: "2px" }}>Logo</span>
          </Nav.Link>
        </OverlayTrigger>
      </div>

      {/* Scrollable Sidebar Items */}
      <div
        style={{
          flex: 1, // Allows scrolling
          overflowY: "auto",
          overflowX: "hidden",
          width: "100%",
          paddingTop: "10px",
          scrollbarWidth: "thin",
        }}
      >
        <Nav className="flex-column text-center">
          {items.map((item, index) => (
            <OverlayTrigger key={index} placement="right" overlay={<Tooltip>{item.name}</Tooltip>}>
              <Nav.Link
                onClick={() => navigate(item.path)}
                className="d-flex flex-column justify-content-center align-items-center my-3"
                style={{
                  width: "56px",
                  height: "50px",
                  cursor: "pointer",
                  transition: "0.3s",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: location.pathname === item.path ? "4px solid #229C47" : "none",
                  padding: "8px",
                }}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
                <span
                  style={{
                    color: item.color,
                    fontSize: "10px",
                    marginTop: "2px",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    width: "100%",
                    marginRight: 5,
                  }}
                >
                  {item.name}
                </span>
              </Nav.Link>
            </OverlayTrigger>
          ))}
        </Nav>
      </div>

      {/* Fixed Logout Section */}
      <div style={{ width: "100%", paddingBottom: "20px" }}>
        <OverlayTrigger placement="right" overlay={<Tooltip>Logout</Tooltip>}>
          <Nav.Link
            onClick={() => navigate("/")}
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              width: "100%",
              height: "50px",
              cursor: "pointer",
              color: "#5B5B5B",
            }}
          >
            <MdOutlineLogout size={25} />
            <span style={{ fontSize: "10px", marginTop: "2px" }}>Logout</span>
          </Nav.Link>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default Sidebar;
