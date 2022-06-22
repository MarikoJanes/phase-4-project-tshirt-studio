import React, { useEffect, useState } from "react";
import { useHistory  } from "react-router-dom";
import Front from "./Front";
import Back from "./Back";


function CreateStudio({ user }) {
    const [selectedColor, setSelectedColor] = useState("white");
    const [templates, setTemplates] = useState([]);
    const [frontDesign, setFrontDesign] = useState(null);
    const [backDesign, setBackDesign] = useState(null);
    const [privateVis, setPrivateVis] = useState(false);

    const history = useHistory();
    
    //fetch the template
    useEffect(() => {
      const image = new Image(600, 600);
      fetch("/tshirt_templates")
      .then(res => res.json())
      .then(data => {
        setTemplates(data);
      })
    }, []);


    function handleSubmit(e) {
      e.preventDefault();
      console.log("submitted");
      const tempObj = templates.find(t => t.color === selectedColor)
      const createdTshirt = {
        user_id: user.id,
        tshirt_template_id: tempObj.id,
        front_design: frontDesign,
        back_design: backDesign,
        private: privateVis
      }

      fetch("/designed_tshirts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(createdTshirt)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        history.push("/mypage");
      });
      
    }

    function handleCategory(e) {
      setSelectedColor(e.target.value)
    }

    function handleChange(e) {
      debugger
      console.log(e.target.checked);
      setPrivateVis(e.target.checked);
    }


console.log(user)   
    if (templates.length==0) return <h2>Loading...</h2>;
  
    return (
      <>
        <div style={{marginTop: "50px"}}>
          
        <select onChange={handleCategory}>
          {/* <option>select color</option> */}
            {templates.map(temp => {
              return <option key={temp.id} value={temp.color}>{temp.color}</option>
            })}
        </select>
        </div>
        <form onSubmit={handleSubmit} >
        <div>
        <Front  selectedColor={selectedColor} templates={templates} setFrontDesign={setFrontDesign} frontDesign={frontDesign}/>
        </div>
        <div>
        <Back  selectedColor={selectedColor} templates={templates} setBackDesign={setBackDesign} backDesign={backDesign}/>  
        </div>
          
              <input type="checkbox"  checked={privateVis} onChange={handleChange} />
          <label>
              keep your design private
          </label>
          <div style={{marginTop: "50px"}} >
            <input type="submit" value="Create" />
          </div>
        </form>
      </>
    );
}


export default CreateStudio