import React from 'react'
import { Image, Button, Icon, Divider } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class Nap extends React.Component {
    state = {
      nap_id: undefined,
      startDate: moment(),
      endDate: moment(),
      showStartNapPicker: false,
      showEndNapPicker: false
    }

    handleChangeStart = (date) => {
      // console.log(`changed time: ${date}`)
      this.setState({ startDate: date }, function() {
        fetch(`http://localhost:3000/api/v1/naps/${this.state.nap_id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ start: this.state.startDate.format("HH:mm") })
        })
          .then(res => res.json())
          .then(nap => {  
            this.props.changeNapStartTime(nap, this.state.startDate) 
          })          
      })


      console.log(this.state.startDate.format("HH:mm"))
    }
    

    handleChangeEnd = (date) => {
      this.setState({ endDate: date })
    }

    startNapPicker = () => {
      return (
        <DatePicker
          placeholderText='Click to select a date'
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={10}
          dateFormat='HH:mm'
          timeCaption='Time'
          minTime={moment().hours(7).minutes(0)}
          maxTime={moment().hours(20).minutes(30)}
        />
      )
    }

    endNapPicker = () => {
      return (
        <DatePicker
          placeholderText='Click to select a date'
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={10}
          dateFormat='HH:mm'
          timeCaption='Time'
          minTime={moment().hours(7).minutes(0)}
          maxTime={moment().hours(20).minutes(30)}
        />
      )
    }

    addNapStartTime = (day, time) => {

      fetch('http://localhost:3000/api/v1/naps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day_id: day.id, start: time })
      })
        .then(res => res.json())
        .then(nap => {
          this.props.addNapToState(nap)
          console.log(nap.id)
          this.setState({ nap_id: nap.id })
        })
      this.setState({
        showStartNapPicker: true
      })
    }
    

    addNapEndTime = (time) => {
      // fetch here to edit the nap and then to add the resp to state
      // console.log(this.state.nap_id)
      console.log(this.state)
      fetch(`http://localhost:3000/api/v1/naps/${this.state.nap_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ end: time })
      })
        .then(res => res.json())
        .then(nap => this.props.changeNapEndTime(nap, time))

      this.setState({
        showEndNapPicker: true
      })
    }

    // deleteNap = (nap) => {}

    render () {
      const cotURL = require('../images/135028-baby-collection/svg/crib.svg')

      return (
        <div>

          <Image
            alt=''
            src={cotURL}
            height='50'
            width='50'
          />

          <Button circular onClick={() => this.addNapStartTime(this.props.day, this.state.startDate.format("HH:mm"))} icon='play'>
            {/* <Icon name='play' /> */}
          </Button>

          {this.state.showStartNapPicker && this.startNapPicker()}

          <Button circular onClick={() => this.addNapEndTime(this.state.endDate.format("HH:mm"))} icon='stop' >
            {/* <Icon name='stop' /> */}
          </Button>

          {this.state.showEndNapPicker && this.endNapPicker()}

          <Button circular onClick={this.deleteNap} icon='trash alternate outline'>
            {/* <Icon name='trash alternate outline' /> */}
          </Button>

          <Button circular icon='add'>
            {/* <Icon name='add' /> */}
          </Button>
        </div>

      )
    }
}

export default Nap
