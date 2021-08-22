import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../StateProvider";
import "./css/Nav.css";

export default function Nav({ setError }) {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <nav className="nav">
      <p>{currentUser.displayName}</p>
      {/* <Link to="/settings">
        <AiOutlineSetting />
      </Link> */}
      <span className="signout" onClick={handleLogout}>
        Log Out
      </span>
    </nav>
  );
}
