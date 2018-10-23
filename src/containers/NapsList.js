import React from 'react'
import moment from 'moment'
import { Button, Image, Grid } from 'semantic-ui-react'
import Nap from '../components/Nap'
import API from '../API'
import './NapsList.css'

class NapsList extends React.Component {
    state = {
      naps: []
    }

    componentDidMount () {
      console.log('component did mount')
      this.getNaps()

      // const channel = this.props.pusher.subscribe('my-channel')
      // channel.bind('my-event', data => {
      //   this.addNapToState(JSON.parse(data.message))
      // })
      // channel.bind('delete-nap', data => {
      //   this.deleteNapFromState(JSON.parse(data.message))
      // })
    }

    addNapToState = (nap) => {
      if(!nap || !nap.hasOwnProperty('start')) {
        return
      }

      console.log(nap)

      if (this.state.naps) {
        var napFound = this.state.naps.find(function(current) {
          return current.id === nap.id
        })

        if (napFound) {
          this.setState({
            naps: this.state.naps.map(n => n.id === nap.id ? nap : n)
          })
        } else {
          let newArray = [...this.state.naps, nap]
          this.setState({ naps: newArray })
        }
      } else {
        let newArray = [nap]
        this.setState({ naps: newArray })
      }
    }

    deleteNapFromState = (nap) => {
      const newNapArray = this.state.naps.filter(stateNap => stateNap.id !== nap.id)
      this.setState({ naps: newNapArray })
    }
    componentDidUpdate (prevProps) {
      // console.log('did update called')
      if (prevProps.day.id !== this.props.day.id && this.props.day.id) {
        this.getNaps()
      }
    }

    getNaps = () => {
      return fetch(API.baseURL + `/kids/${this.props.kid.id}/days/${this.props.day.date}`)
        .then(res => res.json())
        .then(day => {
          if (day.naps) {
            let sortedNaps = day.naps.sort((nap1, nap2) => {
              return (nap1.id - nap2.id)
            })
            this.setState({ naps: sortedNaps })
          }
        })
    }

    addNap = () => {
      // this creates the nap instance in the backend, when the addNap button is first clicked
      // it adds the new nap to the state of NapsList
      if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
        return fetch(API.baseURL + '/naps', {
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
    }

    changeNapStartTime = (nap, time) => {
      if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
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

        return fetch(API.baseURL + `/naps/${nap.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ start: time })
        })
      }
    }

    changeNapEndTime = (nap, time) => {
      if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
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

        return fetch(API.baseURL + `/naps/${nap.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ end: time })
        })
      }
    }

     deleteNap = (nap) => {
       if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
       // const foundNap = this.state.naps.find(stateNap => stateNap.id === nap.id)
       // console.log("foundNap: " + foundNap.id)
         const newNapArray = this.state.naps.filter(stateNap => stateNap.id !== nap.id)
         this.setState({ naps: newNapArray })
         return fetch(API.baseURL + `/naps/${nap.id}`, {
           method: 'DELETE' })
       }
     }

     render () {
      //  const cotURL = require('../images/135028-baby-collection/svg/crib.svg')
       const cotURL = require(`../images/${this.props.kid.gender}_sleep.jpg`)

       return (
         <Grid centered verticalAlign='middle' align className='napsListGrid'>
           <Grid.Row columns={1}>
             <Grid.Column >
               <Image className='elem-icon' onClick={this.addNap} alt='' src={cotURL} height='100'width='110' />
             </Grid.Column>

             {/* <Grid.Column >
               {this.props.currentUser.childminder &&
               <Button className='square-full' onClick={this.addNap} >
              Add nap
               </Button>
               }
             </Grid.Column> */}
           </Grid.Row>
           {this.state.naps && this.state.naps.length > 0 &&
           <Grid.Row columns={1}>
             {this.state.naps.map(nap =>
               <Nap
                 changeNapStartTime={this.changeNapStartTime}
                 changeNapEndTime={this.changeNapEndTime}
                 deleteNap={this.deleteNap}
                 day={this.props.day}
                 nap={nap}
                 key={nap.id}
                 currentUser={this.props.currentUser}
               />
             )}
           </Grid.Row>
           }
           {/* <p>Nap: { this.state.naps.length > 0 ? moment.utc(this.state.naps[0].start).local().format('HH:mm') : "N/A" }</p> */}

         </Grid>
       )
     }
}

export default NapsList
