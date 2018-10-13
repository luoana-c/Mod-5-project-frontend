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

    changeNapStartTime = (nap, time) => {
      const foundNap = this.state.naps.find(stateNap => stateNap.id === nap.id)
      const napToChange = JSON.parse(JSON.stringify(foundNap))
      napToChange.start = time
      this.setState({ foundNap: napToChange })
    }

    changeNapEndTime = (nap, time) => {
      // console.log(nap)
      const foundNap = this.state.naps.find(stateNap => stateNap.id === nap.id) 
// console.log(foundNap)
      const napToChange = JSON.parse(JSON.stringify(foundNap))
      napToChange.end = time
      this.setState({ foundNap: napToChange })
    }

    render () {
      return (
        <div>
          {/* {this.props.napButtons()} */}
          {this.props.present &&
          <Nap
            addNapToState={this.addNapToState}
            changeNapStartTime={this.changeNapStartTime}
            changeNapEndTime={this.changeNapEndTime}
            day={this.props.day}

          />

          }
        </div>
      )
    }
}

export default NapsList
