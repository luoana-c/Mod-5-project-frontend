import React from 'react'
import KidCard from '../components/KidCard'

const KidsList = (props) => {
  return (
    <div>
      {
        props.kids.map((kid) =>
          <KidCard kid={kid} key={kid.id}/>
        )
      }
    </div>
  )
}

export default KidsList
