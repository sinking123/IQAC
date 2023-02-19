import React, { Component } from "react";
import { useState } from "react";

export default function Account() {
  let message = "sample_message",
    mail = "sample_mail",
    phone = "sample_phone";
  let handleChange = "Hello";

  return (
    <div className="header">
      <h2 className="acc">ACCOUNT DETAILS</h2>
      <table>
        <tr>
          <td>
            <input
              NAME
              type="text"
              id="message"
              name="message"
              onChange={handleChange}
              value={message}
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              EMAIL
              ID
              type="email"
              id="mail"
              name="mail"
              onChange={handleChange}
              value={mail}
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              PHONE
              NUMBER
              type="number"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={phone}
            />
          </td>
        </tr>
        <button href="./password.js"> PASSWORD RESET</button>
      </table>
    </div>
  );
}
