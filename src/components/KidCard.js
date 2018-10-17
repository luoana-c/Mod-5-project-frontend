import React from 'react'
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const KidCard = (props) => {
  const fileName = props.kid.gender
  const imageUrl = require(`../images/${fileName}.svg`)
  return (
    <Link to={`/kids/${props.kid.id}`}>
      <div>
        <Image
          id='kid list image'
          alt=''
          src={imageUrl}
          height='50'
          width='50' />
        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{props.kid.first_name} {props.kid.last_name}</span>
        <p>Age: {props.kid.age_years} year(s) {props.kid.age_months} month(s)</p>

      </div>
    </Link>
  )
}

export default KidCard
