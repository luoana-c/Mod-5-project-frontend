import React from 'react'
import Child from '../components/Child'

const ChildrenList = (props) => {
  return (
    <div>
      {
        props.children.map((child) =>
          <Child child={child} />
        )
      }
    </div>
  )
}

export default ChildrenList
