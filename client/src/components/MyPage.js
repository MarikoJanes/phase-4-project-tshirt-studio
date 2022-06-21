import React from 'react'
import { useHistory } from "react-router-dom";

function MyPage({ user }) {
  const history = useHistory();

  function handleClick() {
    history.push("/new");
  }

  console.log(user)
  return (
    <>
      <div>
        <h1>{`Hello, ${user.name}!`}</h1>
      </div>
      <div>
        <h1>Create a T-shirt?</h1>
        <button onClick={handleClick}>START</button>
      </div>
        
    </>
  )
}

export default MyPage