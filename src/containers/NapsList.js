import React from 'react'
import moment from 'moment'
import { Button, Image, Icon } from 'semantic-ui-react'
import Nap from '../components/Nap'

class NapsList extends React.Component {
    state = {
      naps: []
    }

    componentDidMount () {
      console.log('component did mount')
      this.getNaps()
    }

    // componentDidUpdate (prevProps) {
    //   // console.log('did update called')
    //   if (prevProps.day.id !== this.props.day.id && this.props.day.id) {
    //     this.getNaps()
    //   }
    // }

    getNaps = () => {
      return fetch(`http://localhost:3000/api/v1/kids/${this.props.kid.id}/days/${this.props.day.date}`)
        .then(res => res.json())
        .then(day => {
          let sortedNaps = day.naps.sort((nap1, nap2) => {
            return (nap1.id - nap2.id)
          })
          this.setState({ naps: sortedNaps })
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

    changeNapStartTime = (nap, time) => {
      // updates the backend with a start nap time
      // updates the state in NapsList with start nap time
      if (moment.isMoment(time)) {
        // Creeaza o noua data UTC din data initiala care are offset info
        // Pe urma adauga la ea offset infoul datei de input
        // E un hack: practic creezi o noua data UTC care sa aibe valoare datei non UTC
        // Exemplu
        // 2000-01-01 ora 18:00+1:00 (non UTC) devine
        // 2000-01-01 ora 18:00 (UTC)
        time = moment(time).utc().add(time.utcOffset(), 'm')
      }

      const foundNap = this.state.naps.find(stateNap => stateNap.id === nap.id)
      const indexOfNapToChange = this.state.naps.indexOf(foundNap)
      console.log('foundNap: ' + foundNap.id)
      const napToChange = JSON.parse(JSON.stringify(foundNap))
      napToChange.start = time
      
      const newNaps = this.state.naps.slice()
      newNaps.splice(indexOfNapToChange, 1, napToChange)

      this.setState({ naps: newNaps })

      return fetch(`http://localhost:3000/api/v1/naps/${nap.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: time })
      })
    }

    changeNapEndTime = (nap, time) => {
      // updates the backend with an end nap time
      // updates the state in NapsList with end nap time
      if (moment.isMoment(time)) {
        time = moment(time).utc().add(time.utcOffset(), 'm')
      }

      const foundNap = this.state.naps.find(stateNap => stateNap.id === nap.id)
      const indexOfNapToChange = this.state.naps.indexOf(foundNap)
      console.log('foundNap: ' + foundNap.id)
      const napToChange = JSON.parse(JSON.stringify(foundNap))
      napToChange.end = time

      const newNaps = this.state.naps.slice()
      newNaps.splice(indexOfNapToChange, 1, napToChange)

      this.setState({ naps: newNaps })

      return fetch(`http://localhost:3000/api/v1/naps/${nap.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ end: time })
      })
    }

     deleteNap = (nap) => {
       // const foundNap = this.state.naps.find(stateNap => stateNap.id === nap.id)
       // console.log("foundNap: " + foundNap.id)
       const newNapArray = this.state.naps.filter(stateNap => stateNap.id !== nap.id)
       this.setState({ naps: newNapArray })
       return fetch(`http://localhost:3000/api/v1/naps/${nap.id}`, {
         method: 'DELETE' })
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

    render () {
      const cotURL = require('../images/135028-baby-collection/svg/crib.svg')
      return (
        <div>
          <Image alt='' src={cotURL} height='50'width='50' />
          
          <Button circular icon='add' onClick={this.addNap} labelPosition='left'>
            <Icon name='add' />
            Add nap
          </Button>

          {this.state.naps && this.state.naps.map(nap =>
            <Nap
              changeNapStartTime={this.changeNapStartTime}
              changeNapEndTime={this.changeNapEndTime}
              deleteNap={this.deleteNap}
              day={this.props.day}
              nap={nap}
              key={nap.id}
            />
          )}
          {/* <p>Nap: { this.state.naps.length > 0 ? moment.utc(this.state.naps[0].start).local().format('HH:mm') : "N/A" }</p> */}
        </div>
      )
    }
}

export default NapsList
