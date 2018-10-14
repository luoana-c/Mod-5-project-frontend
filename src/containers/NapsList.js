import React from 'react'
import Nap from '../components/Nap'
import { Button, Image } from 'semantic-ui-react'

class NapsList extends React.Component {
    state = {
      naps: []
    }

    componentDidMount () {
      console.log('component did mount')
    }

    componentDidUpdate(prevProps) {
      console.log("did update called")
      if(prevProps.day.id !== this.props.day.id && this.props.day.id) {
        this.getNaps()
      }
    }

    getNaps = () => {
      return fetch(`http://localhost:3000/api/v1/kids/${this.props.kid.id}/days/${this.props.day.date}`)
        .then(res => res.json())
        .then(day => {
          console.log(day.naps)
          this.setState({ naps: day.naps })
        })
    }

    addNap = () => {
      // this creates the nap instance in the backend, when the addNap button is first clicked
      // it adds the new nap to the state of NapsList
      return fetch('http://localhost:3000/api/v1/naps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day_id: this.props.day.id })
      })
        .then(res => res.json())
        .then(nap => {
          console.log(nap.id)
          this.addNapToState(nap)
        })
    }

    addNapStartTime = (nap, time) => {
      // updates the backend with a start nap time
      // updates the state in NapsList with start nap time
      // it shows the timepicker for start of nap
      return fetch(`http://localhost:3000/api/v1/naps/${nap.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: time })
      })
        .then(res => res.json())
        .then(nap => {
          this.changeNapStartTime(nap, time)
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
      if (this.state.naps) {
        let newArray = [...this.state.naps, nap]
        this.setState({ naps: newArray })
      } else {
        let newArray = [nap]
        this.setState({ naps: newArray })
      }
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
      const cotURL = require('../images/135028-baby-collection/svg/crib.svg')
      return (
        <div>
          {this.props.present &&
          <div>
            <Image
              alt=''
              src={cotURL}
              height='50'
              width='50'
            />
            <Button circular icon='add' onClick={this.addNap} />
            
            {this.state.naps && this.state.naps.map(nap =>
              <Nap
                addNapStartTime={this.addNapStartTime}
                addNapEndTime={this.addNapEndTime}
                changeNapStartTime={this.changeNapStartTime}
                changeNapEndTime={this.changeNapEndTime}
                day={this.props.day}
                nap={nap}
              />
            )}
          </div>
          }
        </div>
      )
    }
}

export default NapsList
