import React from 'react'
import Nap from '../components/Nap'

class NapsList extends React.Component {
    state = {
      naps: [
        {
          id: 1,
          day_id: 1,
          start: '11:00',
          end: '12:25',
          duration: '01:25'
        }
      ]
    }

    addNapToState = (nap) => {
      let newArray = [...this.state.naps, nap]
      this.setState({ naps: newArray })
    }

    render () {
      return (
        <div>
          {/* {this.props.napButtons()} */}
          {this.props.present &&
        <Nap addNapToState={this.addNapToState} day={this.props.day}/>

          }
        </div>
      )
    }
}

export default NapsList
