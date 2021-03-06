import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image as Tshirt } from "react-konva";
import { Button, Box, Wrap, Input, useDisclosure, Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { TbCirclePlus } from "react-icons/tb";
import { FaRegWindowClose } from "react-icons/fa";
import FrontDesign from "./FrontDesign";



function Front({ selectedColor, templates, setFrontDesign, frontDesign  }) {

    const [stageImage, setStageImage] = useState(new Image()); // to show a t-shirt templte 
    const [loadedElements, setLoadedElements] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [isClicked,setIsClicked] = useState(false);
    const stageRef = useRef();

    const {
      isOpen: isVisible,
      onClose,
      onOpen,
    } = useDisclosure({ defaultIsOpen: false })
    console.log(loadedElements)
  

  
    //fetch the template
    useEffect(() => {
        const image = new Image(600, 600);
        let tempObj;
        if (selectedColor === null) {
            image.src = templates[0].front_url;
            setStageImage(image);
        } else {
            tempObj = templates.find( temp => {
                if(temp.color === selectedColor) {
                    return temp;
                }
            })
            image.src = tempObj.front_url;
            setStageImage(image);
        }

    }, [selectedColor]);

  
   
    // load a image from local directories
    // function handleLoadFront(e) {
    //   const URL = window.webkitURL || window.webkitURL;
    //   const url = URL.createObjectURL(e.target.files[0]);
    //   const element = new Image(300, 300);
    //   element.src = url;
      
    //   element.onload = function() {
    //     const elementObj = {
    //       x: 10,
    //       y: 10,
    //       width: 100,
    //       height: 100,
    //       image: element 
    //     }
    //     setLoadedElements([...loadedElements, elementObj]);
    //   }
    // }
  
    function checkDeselect(e){
      // deselect when clicked on empty area
    //   const clickedOnEmpty = e.target === e.target.getStage();
    //   console.log(e.target.parent.parent);
    //   console.log(e.target.getStage());
    //   debugger;
      if (e.target.parent.parent === e.target.getStage()) {
        selectShape(null);
      }
    };

    // get an url of the t-shirt
    function handleFrontExport() {
        const uri = stageRef.current.toDataURL();
        setFrontDesign(uri);
        onOpen();
        console.log("clicked");
    }

    function uploadSingleFile(e) {
      const URL = window.webkitURL || window.webkitURL;
      const url = URL.createObjectURL(e.target.files[0]);
      const element = new Image(300, 300);
      element.src = url;
      
      element.onload = function() {
        const elementObj = {
          x: 250,
          y: 250,
          width: 100,
          height: 100,
          image: element 
        }
        setLoadedElements([...loadedElements, elementObj]);
      }
      }
    
      function upload(e) {
        e.preventDefault();
        setIsClicked(true);
        
      }
    
      function deleteFile(e) {
        const s = loadedElements.filter((elm, index) => index !== e);
        setLoadedElements(s);
        console.log(s);
      }

    

  return (
    <>
        
        <h1 className="sides">FRONT</h1>
        <Stage width="600" height="600" onMouseDown={checkDeselect}  ref={stageRef} >
          <Layer>
          <Tshirt  image={stageImage} />
            {loadedElements.length >= 0 && isClicked === true? loadedElements.map((elm, index) => {
              return (
                <FrontDesign  
                    key={index} 
                    image={elm} 
                    
                    isSelected={index === selectedId} 
                    onSelect={() => selectShape(index)}
                    onChange={(newAttrs) => {
                      const loadedImages = loadedElements.slice();
                      loadedImages[index] = newAttrs;
                      setLoadedElements(loadedImages);
                    }} 
                    />
              )
            }) : null}
          </Layer>
        </Stage>

       
        {/* <input onChange={e => handleLoadFront(e)} type="file" id="file_input" /> */}
        <form>
        <Wrap className="form-group preview">
            {loadedElements.length > 0 &&
            loadedElements.map((item, index) => {
                return (
                  <Box key={index}>
                         <img src={item.image.src} alt="" width="100px" height="100px" />
                        <button className='close-btn' type="button" onClick={() => deleteFile(index)}>
                            <FaRegWindowClose/>
                        </button>
                  </Box>
                 );
          })}
        </Wrap>
        <div className="file-inputs">
        <Input
          type="file"
          disabled={loadedElements.length === 5}
          className="form-control"
          onChange={uploadSingleFile}
        />
        </div>
      <Button
        type="button"
        className="btn"
        onClick={upload}
      >
      <span className="icon">
      <TbCirclePlus/>
      </span>
         Upload
      </Button>
      </form>

      <Button 
        onClick={handleFrontExport} 
        
        className="btn submit-btn"
      >
        Save Front Design
      </Button>
 

      {isVisible? 
        <div className="alert">
          <Alert status='success'>
              <AlertIcon />
              <AlertTitle>Success!</AlertTitle>
              <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                color="gray"
                onClick={onClose}
              />
          </Alert>
        </div> : null}
    </>
  )
}

export default Front