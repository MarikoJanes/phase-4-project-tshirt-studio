import React, { useState } from 'react'
import { Box, Image, Stack, FormLabel, Button, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaRegEdit, FaTrash } from "react-icons/fa"
import { ChevronDownIcon, ChevronUpIcon, Search2Icon } from "@chakra-ui/icons"

function TshirtCard({ data, deleteDesign }) {
  const [edit, setEdit] = useState(false);
  const [isPrivate, setIsPrivate] = useState(data.private);
  const [isToggle, setIsToggle] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure()

console.log(isPrivate);

  function handleEditBtn() {
    setEdit(!edit);
  }

  function handlePrivateChange(e) {
    setIsPrivate(e.target.checked);
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
        private: isPrivate
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

  function handleToggle() {
    setIsToggle(!isToggle);
  }



  return (
<>
    <Box id={data.id} boxShadow="sm">
          <div>
            <Image  className="cards" style={{height: "300px"}} src={data.front_design} alt='' />
            <Search2Icon className="show-detail" onClick={onOpen}/>
          </div>
            <Stack>
            <Box className="tshirt-card page-bottom">   
           
          <Button  onClick={handleEditBtn} className="delete-btn">{edit ? <ChevronUpIcon /> : <ChevronDownIcon />}</Button>
          {/* {edit ? <ChevronUpIcon /> : <ChevronDownIcon />} */}
          {edit ? 
            <div>
              <form onSubmit={handleSubmit} >
              <HStack >
                <FaRegEdit className="delete-btn"/>
                <FormLabel className="update-form">Set it private?</FormLabel>
                  <input className="update-form" type="checkbox"  checked={isPrivate} onChange={handlePrivateChange}/>
              </HStack>
                     <Button className="btn card-btn" type="submit" size="sm" >Update</Button>
              </form>
              
              <Button onClick={handleDelete} className="delete-btn"><span className='delete'><FaTrash /></span> Delete</Button>
            </div>
             : null}
            
            </Box>
            </Stack>
    </Box>
    <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image  className="cards" style={{height: "500px"}} src={isToggle ? data.front_design : data.back_design} alt='' />
          </ModalBody>
          <ModalFooter className="modal-content">
            <Button size="lg" colorScheme={isToggle ? 'green' : null } mr={3} onClick={handleToggle}>
              FRONT
            </Button>
            <Button className="toggle-btn" size="lg" colorScheme={isToggle ? null : "green" } onClick={handleToggle}>BACK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
</>
  )
}

export default TshirtCard
