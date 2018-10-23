import React from 'react'
import { Image, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../App.css'

const KidCard = (props) => {
  const fileName = props.kid.gender
  const imageUrl = require(`../images/${fileName}.svg`)
  return (

    <Link to={`/kids/${props.kid.id}`}>
      <Grid verticalAlign='middle' centered columns={2}>
        <Grid.Column className='kid-pic'width={3}>
          <Image
            id='kid list image'
            alt=''
            src={imageUrl}
            height='50'
            width='50' />
        </Grid.Column>

        <Grid.Column>
          <p className='kid-name'>{props.kid.first_name} {props.kid.last_name}</p>
          <p>Age: {props.kid.age_years} year(s) {props.kid.age_months} month(s)</p>
        </Grid.Column>
      </Grid>
    </Link>

  )
}

export default KidCard
