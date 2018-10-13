import React from 'react'
import Nap from '../components/Nap'
import { Button } from 'semantic-ui-react'

class NapsList extends React.Component {
    state = {
      naps: []
    }

    addNapStartTime = (day, time) => {
      // this creates the nap instance in the backend, when the start button is first clicked
      // it adds the new nap to the state of NapsList
      // it shows the timepicker for start of nap
      return fetch('http://localhost:3000/api/v1/naps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day_id: day.id, start: time })
      })
        .then(res => res.json())
        .then(nap => {
          this.addNapToState(nap)
          console.log(nap.id)
        })
    }

    addNapEndTime = (nap, time) => {
      // updates the backend with an end nap time
      // updates the state in NapsList with end nap time
      return fetch(`http://localhost:3000/api/v1/naps/${nap.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ end: time })
      })
        .then(res => res.json())
        .then(nap => {
          this.changeNapEndTime(nap, time)
        })
    }

    addNapToState = (nap) => {
      let newArray = [...this.state.naps, nap]
      this.setState({ naps: newArray })
    }

    changeNapStartTime = (nap, time) => {
      // this only changes it in the state
      const foundNap = this.state.naps.find(stateNap => stateNap.id === nap.id)
      const napToChange = JSON.parse(JSON.stringify(foundNap))
      napToChange.start = time
      this.setState({ foundNap: napToChange })

      fetch(`http://localhost:3000/api/v1/naps/${nap.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: time.format('HH:mm') })
      })
    }

    changeNapEndTime = (nap, time) => {
      // this only changes it in the state
      const foundNap = this.state.naps.find(stateNap => stateNap.id === nap.id)
      const napToChange = JSON.parse(JSON.stringify(foundNap))
      napToChange.end = time
      this.setState({ foundNap: napToChange })

      fetch(`http://localhost:3000/api/v1/naps/${nap.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ end: time.format('HH:mm') })
      })
    }

    render () {
      return (
        <div>
          {/* {this.props.napButtons()} */}
          <Button circular icon='add' />

          {this.props.present &&
          <Nap
            addNapStartTime={this.addNapStartTime}
            addNapEndTime={this.addNapEndTime}
            changeNapStartTime={this.changeNapStartTime}
            changeNapEndTime={this.changeNapEndTime}
            day={this.props.day}
            nap={this.state.naps[0]}

          />

          }
        </div>
      )
    }
}

export default NapsList
