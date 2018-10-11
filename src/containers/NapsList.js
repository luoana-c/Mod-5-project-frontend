import React from 'react'
import Nap from '../components/Nap'

class NapsList extends React.Component {
  render () {
    return (
      <div>
        {this.props.napButtons()}
        {this.props.naps &&
            this.props.naps.map((nap) =>
              <Nap nap={nap} key={nap.id} />
            )
        }
      </div>
    )
  }
}

export default NapsList
