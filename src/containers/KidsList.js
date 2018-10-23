import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Image } from 'semantic-ui-react'
import KidCard from '../components/KidCard'

const KidsList = (props) => {
  const titleURL = require('../images/logo2.png')
  return (
    <div className='kid-list'>
      <div className='logo-on-forms'>
        <Image src={titleURL} className='logo-image' />
      </div>
      <br />
      <br />
      {props.kids.length < 1 &&
        <div>
          <h3>You have no children on your list</h3>
          <h3>Go to menu > Add a new child</h3>
        </div>
      }

      { props.kids &&
        props.kids.map((kid) =>
          <div >
            <KidCard kid={kid} key={kid.id} />
            <Divider />
          </div>
        )
      }
    </div>
  )
}

export default KidsList
