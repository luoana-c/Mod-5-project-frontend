import React from 'react'

import { Divider, Image } from 'semantic-ui-react'
import KidCard from '../components/KidCard'

const ParentsKidsList = (props) => {
  const titleURL = require('../images/logo2.png')
  return (
    <div>
      <div className='logo-on-forms'>
        <Image src={titleURL} className='logo-image' />
      </div>
      <br />
      <br />
      <br />
      { props.kids &&
        props.kids.map((kid) =>
          <div key={kid.first_name}>
            <KidCard kid={kid} />
            {/* <Divider /> */}
          </div>
        )
      }
    </div>
  )
}

export default ParentsKidsList
