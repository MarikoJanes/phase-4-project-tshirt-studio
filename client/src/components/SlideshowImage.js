import React, { useState, useEffect } from 'react'
import { Image, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

function SlideshowImage({ tshirt }) {
    const [isToggle, setIsToggle] = useState(true);
    const [creator, setCreator] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const creatorName = tshirt.user.name
;
    function handleToggle() {
        setIsToggle(!isToggle);
    }
    

  return (
    <>
    <Image onClick={onOpen} id={tshirt.id} style={{height: "300px",}} src={tshirt.front_design} alt={tshirt.id}/>
  
    <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        size="xl"
      >
    <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                <h1 className="modal-header">
                    Creator: {creatorName}
                </h1>
            </ModalHeader>
             <ModalCloseButton />
                <ModalBody>
                    <Image  className="cards" style={{height: "500px"}} src={isToggle ? tshirt.front_design : tshirt.back_design} alt='' />
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

export default SlideshowImage