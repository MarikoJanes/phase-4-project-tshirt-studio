import React, { useState } from 'react'

function TshirtCard({ data, deleteDesign }) {
  const [edit, setEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(data.private);



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
    console.log(e.target.parentElement.parentElement.id);
    fetch(`/designed_tshirts/${data.id}`, {
      method: "DELETE"
    })
    deleteDesign(e.target.parentElement.parentElement.id);
  }



  return (
    <div className='cards lists'>
        <li className="card" id={data.id}>
            <img style={{height: "236.29px"}} src={data.front_design} alt='' />
          <button  onClick={handleEditBtn} className="primary">Edit?</button>
          {edit ? 
          <div>
              <form onSubmit={handleSubmit} >
                  <input type="checkbox" checked={isChecked} onChange={handlePrivateChange}/>
                    <label>make it private?</label>
                  <input type="submit" value="Update!" />
              </form>
              <button onClick={handleDelete}>X</button>
          </div>
             : null}
        </li>
    </div>
  )
}

export default TshirtCard
