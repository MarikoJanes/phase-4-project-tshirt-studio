import React from 'react';
import { Link } from "react-router-dom";

function TitlePage() {
  return (
    <>
      <h1>Welcome to T-shirt Studio!</h1>
      <h2>Ready to create your original Ts?</h2>
      <ul>
        <li>
          <Link to="/login" >Login</Link>
        </li>
        <li>
          <Link to="/signup" >Signup</Link>
        </li>
      </ul>
    </>
  )
}

export default TitlePage