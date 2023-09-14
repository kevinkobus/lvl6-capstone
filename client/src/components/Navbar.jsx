import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const { logout } = props;
  return (
    <div className="navbar">
      <Link to="/profile" className="nav-link">
        Profile
      </Link>
      <Link to="/public" className="nav-link">
        Public
      </Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
