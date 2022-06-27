import React, { useEffect, useState } from "react";
import { useHistory  } from "react-router-dom";
import { SimpleGrid, GridItem, Select, Checkbox, Button } from "@chakra-ui/react";
import Front from "./Front";
import Back from "./Back";


function CreateStudio({ user }) {
    const [selectedColor, setSelectedColor] = useState("White");
    const [templates, setTemplates] = useState([]);
    const [frontDesign, setFrontDesign] = useState(null);
    const [backDesign, setBackDesign] = useState(null);
    const [privateVis, setPrivateVis] = useState(false);
    const [error, setError] = useState([]);

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

console.log(error);
    function handleSubmit(e) {
      e.preventDefault();
      console.log("submitted");
      if(frontDesign === null || backDesign === null) {
        setError("You haven't saved your design")
      } else {
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
    }

    function handleCategory(e) {
      setSelectedColor(e.target.value)
    }

    function handleChange(e) {
      console.log(e.target.checked);
      setPrivateVis(e.target.checked);
    }


console.log(user)   
    if (templates.length==0) return <h2>Loading...</h2>;
  
    return (
      <>
        <div className="select-option"  >
        <h1>choose a color :</h1>
          <Select 
              onChange={handleCategory} 
             borderColor="orange.300"

          >
              {templates.map(temp => {
                return <option key={temp.id} value={temp.color}>{temp.color}</option>
              })}
          </Select>
        </div>
        
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{lg: 2, md: 1}} className="studio">
             <GridItem colSpan={1}>
                <Front  selectedColor={selectedColor} templates={templates} setFrontDesign={setFrontDesign} frontDesign={frontDesign}/>
             </GridItem>
             <GridItem colSpan={1}>
                <Back  selectedColor={selectedColor} templates={templates} setBackDesign={setBackDesign} backDesign={backDesign}/>  
             </GridItem>
          </SimpleGrid>
              <div className="checkbox">
              <Checkbox 
                  type="checkbox"  
                  checked={privateVis} 
                  onChange={handleChange} 
                  size='lg' colorScheme='orange' defaultChecked
              >
                  Set your design public?
              </Checkbox>
              </div>
              {error.length > 0 ? <h1 className='error-message'>{error}</h1> : null}
              <div className="checkbox">
                <Button className='btn-create page-bottom-1' type="submit" >Create</Button>
              </div>
          
        </form>
      </>
    );
}


export default CreateStudio