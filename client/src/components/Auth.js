import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";

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
    <Flex className="userForm" alignItems="center" justifyContent="center">
        <Flex className="login" direction="column" background="yellow.100" p={12} rounded={6}>
            <form onSubmit={handleSubmit}>
                <Heading mb={6} >Sign Up</Heading>
            {/* <label>Username</label> */}
                <Input 
                    background="white"
                    placeholder='username' 
                    mb={3}
                    type="text" 
                    name="usesrname" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                />

            {/* <label>Email</label> */}
                <Input 
                    background="white"
                    placeholder="email@example.com"
                    mb={6}
                    type="text"
                    name="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />           
            {/* <label>Password</label> */}
                <Input 
                    background="white"
                    placeholder="password"
                    mb={6}
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />

            {/* <label>Password Confirmation</label> */}
                <Input 
                    background="white"
                    placeholder="password confirmation"
                    mb={6}
                    type="password" 
                    name="password"
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                />

                {errors ? errors.map((error, index) => {
                    return <p style={{color: "red"}} key={index}>{error}</p>
                }) : null}
                <Button mt={3} mb={6} type="submit" colorScheme="orange" variant='solid'>Sign Up</Button>
            </form>
            <p style={{color: "gray"}}>Already a member? <Link to="/login"> Log in</Link></p>
        </Flex>
    </Flex>
  )
}

export default Auth