import React, { useState } from 'react'
import { Box, Image, Flex, Stack, Switch, FormLabel, Button, HStack } from "@chakra-ui/react";
import { FaRegEdit, FaTrash } from "react-icons/fa"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"

function TshirtCard({ data, deleteDesign }) {
  const [edit, setEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(data.private);

console.log(data)

  function handleEditBtn() {
    setEdit(!edit);
  }

  function handlePrivateChange() {
    setIsChecked(!isChecked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("isChecked");
    fetch(`/designed_tshirts/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        private: isChecked
      })
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  function handleDelete(e) {
    // console.log(e.target.parentElement.parentElement.parentElement.parentElement.id);
    fetch(`/designed_tshirts/${data.id}`, {
      method: "DELETE"
    })
    .then(() => {
      deleteDesign(data.id);
    })
    .catch(err => console.log(err));
  }



  return (
<>
    <Box id={data.id} className='cards lists' boxShadow="sm">
       
            <Image  style={{height: "300px"}} src={data.front_design} alt='' />
            <Stack>
            <Box className="tshirt-card">   
            
          <Button  onClick={handleEditBtn} className="delete-btn"><FaRegEdit/></Button>
          {edit ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {edit ? 
            <div>
              <form onSubmit={handleSubmit} >
              <HStack >
                <FormLabel className="update-form">make it private?</FormLabel>
                  <Switch className="update-form" type="checkbox" colorScheme="green" checked={isChecked} onChange={handlePrivateChange}/>
              </HStack>
                     <Button className="btn card-btn" type="submit" size="sm" >Update</Button>
              </form>
              
              <Button onClick={handleDelete} className="delete-btn"><span className='delete'><FaTrash /></span> Delete</Button>
            </div>
             : null}
            
            </Box>
            </Stack>
    </Box>
</>
  )
}

export default TshirtCard
