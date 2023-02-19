import React, { Component } from "react";
import bg_img from "./images/bg-img.png";

export default function MainComponent() {
  let handleOpen = "handle_open";
  let open = true;
  return (
    <nav className="nav-list">
      <img src={bg_img} />
      <div className="dropdown">
        <button onClick={handleOpen}>Settings</button>
        {open ? (
          <ul className="menu" style={{ listStyle: "none" }}>
            <li className="menu-item">
              <button href="#">Account Details</button>
            </li>
            <li className="menu-item">
              <button href="#">Logout</button>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
}
