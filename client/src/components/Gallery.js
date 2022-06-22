import React, { useState, useEffect } from 'react';
import Slideshow from './Slideshow';


function Gallery() {
    const [tshirtData, setTshirtData] = useState([]);

    useEffect(() => {
        fetch("designed_tshirts")
        .then(res => res.json())
        .then(data => {
            const publicData = data.filter(d => {
                if(d.private === false) {
                    return true;
                } else {
                    return false;
                }
            });
            setTshirtData(publicData);
        });
    }, []) 




    if (tshirtData.length === 0) return <h2>Loading...</h2>;

  return (
    <>
        <Slideshow tshirtData={tshirtData} />
    </>
  )
}

export default Gallery