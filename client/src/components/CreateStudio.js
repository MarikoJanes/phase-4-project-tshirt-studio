import React, { useEffect, useState } from "react";
import { Stage, Layer, Image as Tshirt } from "react-konva";
import Front from "./Front";
import Back from "./Back";


function CreateStudio() {
    const [stageImage, setStageImage] = useState(new Image()); // to show a t-shirt templte 

 
    const [selectedColor, setSelectedColor] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
  
    //fetch the template
    useEffect(() => {
      const image = new Image(600, 600);
      fetch("/tshirt_templates")
      .then(res => res.json())
      .then(data => {
        setTemplates(data);
        if(isClicked === false) {
          image.src = "../image/front-white.png";
        } else {
          image.src = "../image/back-white.png";
        }
        
        setStageImage(image);
      })
    }, []);



    //swithc FRONT or BACK 
    function handleClick() {
      setIsClicked(!isClicked);
    }


   

    console.log(selectedColor);

   
    if (templates.length==0) return <h2>Loading...</h2>;
  
    return (
      <>
        <div style={{marginTop: "50px"}}>
          <p>switch the sides🔄</p>
          <button onClick={handleClick} >{isClicked ? "BACK" : "FRONT" }</button>  
          
        </div>
        //Toggle display none if you hit the front/back button
        <Back setSelectedColor={setSelectedColor}  selectedColor={selectedColor} templates={templates} />  
          <Front setSelectedColor={setSelectedColor} selectedColor={selectedColor} templates={templates} />
        {/* {
                  isClicked ? <Back setSelectedColor={setSelectedColor}  selectedColor={selectedColor} templates={templates} /> : <Front setSelectedColor={setSelectedColor} selectedColor={selectedColor} templates={templates} />

        } */}
      
      </>
    );
}


export default CreateStudio