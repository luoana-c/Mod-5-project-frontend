import React from 'react'
import { Divider, Image } from 'semantic-ui-react'


const Child = (props) => {
  const fileName = props.child.gender
  const imageUrl = require(`../images/${fileName}.svg`)
  return (
    <div>
      <Image 
        id='child list image'
        alt=''
        src={imageUrl}
        height='50'
        width='50' />
      <span style={{fontWeight: 'bold', fontSize: '20px'}}>{props.child.first_name} {props.child.last_name}</span>
      <p>Age: {props.child.age_years} year(s) {props.child.age_months} month(s)</p>
      
    </div>
  )
}

export default Child
