import React from 'react'

import { Divider } from 'semantic-ui-react'
import KidCard from '../components/KidCard'

const ParentsKidsList = (props) => {
  return (
    <div>
      { props.kids &&
        props.kids.map((kid) =>
          <div key={kid.first_name}>
            <KidCard kid={kid} />
            <Divider />
          </div>
        )
      }
    </div>
  )
}

export default ParentsKidsList
