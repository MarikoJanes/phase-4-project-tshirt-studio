import React from 'react'

function TshirtCard({ data }) {

  return (
    <div>
        <li>
            <img src={data.front_design} alt='' />
        </li>
    </div>
  )
}

export default TshirtCard