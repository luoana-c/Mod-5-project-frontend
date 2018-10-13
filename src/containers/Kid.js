import React from 'react'
import { Image, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import NapsList from './NapsList'

class Kid extends React.Component {
    state = {
      day: {
        id: undefined,
        date: undefined
      },
      startDate: moment().startOf('day'),
      presence: false
    }

    handleChange = (date) => {
      this.setState({ startDate: date })
      this.getDay(date)
    }

    componentDidMount () {
      console.log(this.state.startDate)
      console.log(this.state.startDate.format('YYYY-MM-DD'))
      this.getDay(this.state.startDate)
      // this.getDay()
    }

    getDay = (date) => {
      return fetch(`http://localhost:3000/api/v1/kids/${this.props.kid.id}/days/${date.format('YYYY-MM-DD')}`)
        .then(res => res.json())
        .then(day => this.setState({ day: { id: day.id, date: day.date } }))
        .then(() => this.state.day.id 
          ? this.setState({ presence: true })
          : this.setState({ presence: false }))
    }

    createDay = () => {
      return fetch('http://localhost:3000/api/v1/days', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kid_id: this.props.kid.id, date: this.state.startDate.format('YYYY-MM-DD') })
      })
        .then(res => res.json())
        .then(day => this.setState({ day: { id: day.id, date: day.date } }))
    }
    togglePresence = () => {
      if (this.state.startDate.format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
        //TODO: https://momentjs.com/docs/#/query/is-same/ (cu parametru pt granularitate)
        this.setState({ presence: !this.state.presence })
        this.createDay()
      }
    }

    // napButtons () {
    //   return (
    //     <>
    //       stuff
    //       <Image />
    //     </>
    //   )
    // }

    render = () => {
      const fileName = this.props.kid.gender
      const imageUrl = require(`../images/${fileName}.svg`)

      return (
        <div>
          <DatePicker
            dateFormat='DD/MM/YYYY'
            selected={this.state.startDate}
            onChange={this.handleChange}
            filterDate={this.isWeekday}
            maxDate={moment()}
            placeholderText='Select a weekday'
          />

          <Image
            alt=''
            src={imageUrl}
            height='50'
            width='50'
          />
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
            {this.props.kid.first_name} {this.props.kid.last_name}
          </span>
          <p>Age: {this.props.kid.age_years} year(s) {this.props.kid.age_months} month(s)</p>

          <Button toggle active={this.state.presence} onClick={this.togglePresence}>
            {this.state.presence ? 'Present' : 'Absent'}
          </Button>

          <div>
            <NapsList
              // napButtons={this.napButtons}
              present={this.state.presence}
              day={this.state.day}
            />
          </div>
        </div>
      )
    }
}

export default Kid
