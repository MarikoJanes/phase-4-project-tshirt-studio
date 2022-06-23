import React from 'react';
import { Link } from "react-router-dom";
import { Button, Flex, Text } from '@chakra-ui/react'

function TitlePage() {
  return (
    <>
    <flex className="headlineContainer">
      <h1 className="headline">Welcome to T-Studio!</h1>
      <h2 className="headline">Ready to design an <i><b>awesome</b></i> custom T-shirt?</h2>
    </flex>
    <Flex className="titleButton" alignItems="center" justifyContent="center">
      <Button colorScheme="orange">
        <Link to="/login" >Login</Link>
      </Button>
      <Text mx={12}>OR</Text>
      <Button colorScheme="orange">
        <Link to="/signup" >Signup</Link>
      </Button>
    </Flex>
          
      
    </>
  )
}

export default TitlePage