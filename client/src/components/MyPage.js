import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import TshirtCard from './TshirtCard';

function MyPage({ user }) {
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const id = useParams();
  

  useEffect(() => {
    fetch(`/authorized_user`)
    .then(res => res.json())
    .then(data => setUserData(data))
  }, []);

  function handleClickStart() {
    history.push("/new");
  }

  function handleClickView() {
    console.log("take you to the gallery page");
    history.push("/galleries");
  }

  function deleteDesign(id) {
    console.log(id);
    const newData = userData.designed_tshirts.filter(tshirt => tshirt.id !== id);
    console.log(newData);
    setUserData(newData);
  }

  if (!userData) return <h2>Loading...</h2>;

  return (
    <>
      <div>
        <h1>{`Hello, ${user.name}!`}</h1>
      </div>
      <div>
        <h1>Create a T-shirt?</h1>
        <button onClick={handleClickStart}>START</button>
      </div>
      <div>
        <h1>Browse T-shirt designs?</h1>
        <button onClick={handleClickView}>View designs</button>
      </div>
      <div>
        <h3>your awesome designs!</h3>
        {userData.designed_tshirts ? 
          userData.designed_tshirts.map(data => {
            return <TshirtCard key={data.id} data={data} deleteDesign={deleteDesign} />
          }) : null}
      </div>
    </>
  )
}

export default MyPage