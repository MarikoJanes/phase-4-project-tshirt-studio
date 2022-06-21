import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image as Tshirt } from "react-konva";
import BackGround from "./BackGround";

function Back({ setSelectedColor, selectedColor, templates  }) {

    const [stageImage, setStageImage] = useState(new Image()); // to show a t-shirt templte 
    const [loadedElements, setLoadedElements] = useState([]);
    const [selectedId, selectShape] = useState(null);
   

  
     //fetch the template
     useEffect(() => {
        const image = new Image(600, 600);
        if (selectedColor === null) {
            image.src = templates[0].back_url;
            setStageImage(image);
        } else {
            const tempObj = templates.find( temp => {
                if(temp.color === selectedColor) {
                    return temp;
                }
            })
            image.src = tempObj.back_url;
            setStageImage(image);
        }
 
      }, []);
  

    


   
    // load a image from local directories
    function handleLoad(e) {
      const URL = window.webkitURL || window.webkitURL;
      const url = URL.createObjectURL(e.target.files[0]);
      const element = new Image(300, 300);
      element.src = url;
      
      element.onload = function() {
        const elementObj = {
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          image: element 
        }
        setLoadedElements([...loadedElements, elementObj]);
      }
    }
  
    function checkDeselect(e){
      // deselect when clicked on empty area
    //   const clickedOnEmpty = e.target === e.target.getStage();
      // console.log(e.target);
    //   console.log(e.target.getStage());
    //   debugger;
      if (e.target._id===2) {
        selectShape(null);
      }
    };

    function handleCategory(e) {
      setSelectedColor(e.target.value);
      const image = new Image(600, 600);
      
      const tempObj = templates.find(temp => {
        if(temp.color === e.target.value) {
          return true
        }
      })
     
        image.src = tempObj.front_url;
        setStageImage(image);
    }

    
  return (
    <>
        <Stage width="600" height="600" onMouseDown={checkDeselect} onTouchStart={checkDeselect} >
          <Layer>
          <Tshirt  image={stageImage} />
            {loadedElements.length >= 0 ? loadedElements.map((elm, index) => {
              return (
                <BackGround 
                    key={index} 
                    image={elm} 
                    
                    isSelected={index === selectedId} 
                    onSelect={() => selectShape(index)}
                    onChange={(newAttrs) => {
                      const loadedImages = loadedElements.slice();
                      loadedImages[index] = newAttrs;
                      setLoadedElements(loadedImages);
                    }} />
              )
            }) : null}
          </Layer>
        </Stage>
        <h1>BACK</h1>
        <input onChange={e => handleLoad(e)} type="file" id="file_input" />
        <select onChange={handleCategory}>
          <option>select color</option>
            {templates.map(temp => {
              return <option key={temp.id} value={temp.color}>{temp.color}</option>
            })}
        </select>
    </>
  )
}

export default Back