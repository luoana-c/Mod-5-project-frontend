import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Divider } from 'semantic-ui-react'
import KidCard from '../components/KidCard'

const KidsList = (props) => {
  return (
    <div>
      <Link to='/new'>
        <Button>Add a new child</Button>
      </Link>
      { props.kids &&
        props.kids.map((kid) =>
          <div>
            <KidCard kid={kid} key={kid.id} />
            <Divider />
          </div>
        )
      }
    </div>
  )
}

export default KidsList
