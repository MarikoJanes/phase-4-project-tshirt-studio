import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Login({ setUser, setIsAuthenticated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState([]);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: username,
            password
        }

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok) {
                res.json()
                .then(user => {
                    setUser(user);
                    setIsAuthenticated(true);
                    history.push("/mypage")
                })
            } else {
                res.json()
                .then(json => setError(json.error))
            }
        })
    }

  return (
    <>
        <h1>T-shirt studio</h1>
        <h1>Login</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
                type="text"
                name="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
            />
            <br></br>
            <label>Password</label>
            <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
            />
            <br></br>
            <input type="submit" value="Login!" />
        </form>
        {error ? <div style={{color: 'red'}} >{error}</div> : null}

    </>
  )
}

export default Login