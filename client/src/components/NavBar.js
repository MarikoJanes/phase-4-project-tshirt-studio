import React from 'react'
import { useHistory, NavLink } from "react-router-dom"

function NavBar({ setIsAuthenticated, setUser, isAuthenticated }) {

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

  function handleMyPage() {
    history.push("/my-page");
  }


  return (
    <header>
      <NavLink to="/" >HOME</NavLink>
      <button onClick={handleLogin} > Login</button>
      <button onClick={handleLogout} >Logout</button>
      {isAuthenticated ? <button onClick={handleMyPage} >My page</button> : null}
    </header>
  )
}

export default NavBar