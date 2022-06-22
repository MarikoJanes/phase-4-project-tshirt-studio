import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image as Tshirt } from "react-konva";
import BackDesign from './BackDesign';

function Back({  selectedColor, templates, setBackDesign  }) {

    const [stageImage, setStageImage] = useState(new Image()); // to show a t-shirt templte 
    const [loadedElements, setLoadedElements] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [isClicked,setIsClicked] = useState(false);
    const stageRef = useRef();



     //fetch the template
     useEffect(() => {
        const image = new Image(600, 600);
        let tempObj;
        if (selectedColor === null) {
            image.src = templates[0].back_url;
            setStageImage(image);
        } else {
            tempObj = templates.find( temp => {
                if(temp.color === selectedColor) {
                    return temp;
                }
            })
            image.src = tempObj.back_url;
            setStageImage(image);
        } 
      }, [selectedColor]);
  

    


   
    // load a image from local directories
    // function handleLoad(e) {
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
    //   console.log(e.target);
    //   console.log(e.target.getStage());
    //   debugger;
    if (e.target.parent.parent === e.target.getStage()) {
        selectShape(null);
      }
    };

    function handleBackExport() {
        const uri = stageRef.current.toDataURL();
        setBackDesign(uri);
        console.log("clicked");
    }

    function uploadSingleFile(e) {
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
        <input type="button" value="save" onClick={handleBackExport} style={{ marginTop: "50px" }}/>
        <Stage width="600" height="600" onMouseDown={checkDeselect} onTouchStart={checkDeselect} ref={stageRef}>
          <Layer>
          <Tshirt  image={stageImage} />
            {loadedElements.length >= 0 && isClicked === true ? loadedElements.map((elm, index) => {
              return (
                <BackDesign 
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
        {/* <input onChange={e => handleLoad(e)} type="file" id="file_input" /> */}
        <form>
        <div className="form-group preview">
            {loadedElements.length > 0 &&
            loadedElements.map((item, index) => {
                return (
                     <div key={index}>
                         <img src={item.image.src} alt="" width="100px" height="100px" />
                        <button type="button" onClick={() => deleteFile(index)}>
                            delete
                        </button>
                     </div>
                 );
          })}
        </div>
        <div className="form-group">
        <input
          type="file"
          disabled={loadedElements.length === 5}
          className="form-control"
          onChange={uploadSingleFile}
        />
        </div>
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={upload}
      >
        Upload
      </button>
      </form>
    </>
  )
}

export default Back