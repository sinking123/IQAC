import React, { Component } from "react";

export default function Password() {
  let phone = "sample_phone",
    mail = "sample_mail",
    message = "sample_message",
    handleChange = "handle_change";
  return (
    <div className="div">
      <table>
        <tr>
          <td>
            <input
              CURRENT
              PASSWORD
              type="password"
              id="pass"
              name="pass"
              onChange={handleChange}
              value={message}
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              NEW
              PASSWORD
              type="password"
              id="pass"
              name="pass"
              onChange={handleChange}
              value={mail}
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              CONFIRM
              NEW
              PASSWORD
              type="password"
              id="pass"
              name="pass"
              onChange={handleChange}
              value={phone}
            />
          </td>
        </tr>
        <button> RESET</button>
      </table>
    </div>
  );
}
