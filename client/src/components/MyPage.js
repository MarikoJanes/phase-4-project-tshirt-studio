import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Box, Grid, Flex, SimpleGrid, GridItem, Wrap } from "@chakra-ui/react";
import TshirtCard from './TshirtCard';

function MyPage({ user }) {
  const [userData, setUserData] = useState({});
  const history = useHistory();

  

  useEffect(() => {
    fetch(`/authorized_user`)
    .then(res => res.json())
    .then(data => setUserData(data))
  }, []);

  function handleClickStart() {
    history.push("/new");
  }

  function handleClickView() {
    console.log("take you to the gallery page");
    history.push("/galleries");
  }

  function deleteDesign(id) {
    console.log(id);
    const newData = userData.designed_tshirts.filter(tshirt => tshirt.id !== id);
    console.log(newData);
    setUserData(newData);
  }

  if (user === null) return <h2>Loading...</h2>;

  return (
    <>
      <Flex justifyContent="center">
        <h1 className='username'>{`Hello, ${user.name}!`}</h1>
      </Flex>
      <SimpleGrid columns={2} >
        <GridItem colSpan={1} className="user-option">
          <h1>Create a T-shirt?</h1>
          <Button onClick={handleClickStart}>START</Button>
        </GridItem>
        <GridItem colSpan={1} className="user-option">
          <h1>Browse T-shirt designs?</h1>
          <Button onClick={handleClickView}>View designs</Button>
        </GridItem>
      </SimpleGrid>
      <div>
        <h1 className="design-collection">your awesome collections:</h1>
        <Wrap>
        {userData.designed_tshirts ? 
          userData.designed_tshirts.map(data => {
            return <TshirtCard key={data.id} data={data} deleteDesign={deleteDesign} />
          }) : null}
        </Wrap>
      </div>
    </>
  )
}

export default MyPage