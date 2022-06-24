import React from 'react';
import { Link } from "react-router-dom";
import { Button, Flex, Text, Image } from '@chakra-ui/react'

function TitlePage({ user }) {
  console.log(user);
  return (
    <>
    <div className="container">
      <h1 className="headline">Welcome to T-Studio!</h1>
      <h2 className="headline">Ready to design an <i><b>awesome</b></i> custom T-shirt?</h2>
    </div>
    <div className="headlineContainer">
      <img className="title-image" src="../image/tshirt-icon.png" />     
      <img className="splatter" src="../image/splatter.png" />
      <img className="splatter2" src="../image/splatter2.png" />
      <img className="splatter3" src="../image/splatter3.png" />
    </div>
    {user === null ? 
      <Flex className="titleButton" alignItems="center" justifyContent="center">
        <Button colorScheme="orange" className="page-bottom-1">
          <Link to="/login" >Login</Link>
        </Button>
        <Text mx={12} className="page-bottom-1">OR</Text>
        <Button colorScheme="orange" className="page-bottom-1">
          <Link to="/signup" >Signup</Link>
        </Button>
      </Flex> 
      : 
      <Flex className="titleButton" alignItems="center" justifyContent="center">
        <Button colorScheme="orange" className="page-bottom-1">
          <Link to="/mypage" >Get Started</Link>
        </Button>
      </Flex>
    }
    </>
  )
}

export default TitlePage