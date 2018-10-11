import React from 'react'
import { Divider, Image } from 'semantic-ui-react'


const KidCard = (props) => {
  const fileName = props.kid.gender
  const imageUrl = require(`../images/${fileName}.svg`)
  return (
    <div>
      <Image 
        id='kid list image'
        alt=''
        src={imageUrl}
        height='50'
        width='50' />
      <span style={{fontWeight: 'bold', fontSize: '20px'}}>{props.kid.first_name} {props.kid.last_name}</span>
      <p>Age: {props.kid.age_years} year(s) {props.kid.age_months} month(s)</p>
      
    </div>
  )
}

export default KidCard
