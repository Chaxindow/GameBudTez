import React from "react";
import { Link } from "react-router-dom";
import "./messengerNavbar.scss"; // Stil dosyasını import ediyoruz

const MessengerNavbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <span className="brand">GameBud</span>
        </Link>
      </div>
    </div>
  );
};

export default MessengerNavbar;
