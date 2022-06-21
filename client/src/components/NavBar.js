import React from 'react'
import { useHistory, NavLink } from "react-router-dom"

function NavBar({ setIsAuthenticated, setUser }) {

  const history = useHistory();

  function handleLogin() {
    history.push("/login");
  }


  function handleLogout() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then(() => {
      setIsAuthenticated(false);
      setUser(null);
      history.push("/")
    });
  }


  return (
    <header>
      <NavLink to="/" >HOME</NavLink>
      <button onClick={handleLogin} > Login</button>
      <button onClick={handleLogout} >Logout</button>
    </header>
  )
}

export default NavBar