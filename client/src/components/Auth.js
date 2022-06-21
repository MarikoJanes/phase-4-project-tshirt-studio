import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Auth({ setUser, setIsAuthenticated }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: username,
            email,
            password,
            password_confirmation: passwordConfirmation
        }

        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(user => {
                    setUser(user);
                    setIsAuthenticated(true);
                    history.push("/mypage");
                })
            } else {
                res.json()
                .then(json => setErrors(json.errors))
            }
        })
    }


  return (
    <>
        <h1>Sign Up for a T-shirt createtor?</h1>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
                type="text" 
                name="usesrname" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
            />
                <br></br>
            <label>Email</label>
            <input 
                type="text"
                name="email" 
                value={email}
                onChange={e => setEmail(e.target.value)} 
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
            <label>Password Confirmation</label>
            <input 
                type="password" 
                name="password"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
            />
                <br></br>
            {errors ? errors.map((error, index) => {
                return <p style={{color: "red"}} key={index}>{error}</p>
            }) : null}
            <input type="submit" value="Sign Up!" />
        </form>
    </>
  )
}

export default Auth