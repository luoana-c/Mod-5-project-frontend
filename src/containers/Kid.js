import React from 'react'
import { Image, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import NapsList from './NapsList'
import NappyPotty from '../components/NappyPotty'
import Food from '../components/Food'

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
        .then(day => {
          let newState = {
            day: day
          }
          newState.presence = !!day.id
          this.setState(newState)
        })

      // .then(day => this.setState({ day: { id: day.id, date: day.date } }))
      // .then(() => this.state.day.id
      //   ? this.setState({ presence: true })
      //   : this.setState({ presence: false }))
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
        // TODO: https://momentjs.com/docs/#/query/is-same/ (cu parametru pt granularitate)
        this.setState({ presence: !this.state.presence })
        this.createDay()
      }
    }

    addNappy = () => {
      if (!this.state.nappy_potty) {
        return fetch('http://localhost:3000/api/v1/nappy_potties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ day_id: this.state.day.id })
        })
          .then(res => res.json())
          .then(nappyPotty => this.setState({ nappy_potty: nappyPotty }))
      }
    }

    addNappyWet = () => {
      let wetCount = this.state.day.nappy_potty.wet

      const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, wet: (wetCount ? (wetCount + 1) : 1) }
        }
      }
      // console.log('new kid state:', newState)
      this.setState(newState)

      console.log(this.state.day.nappy_potty.id)
      return fetch(`http://localhost:3000/api/v1/nappy_potties/${this.state.day.nappy_potty.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wet: (wetCount ? (wetCount + 1) : 1) })
      })
    }

    removeNappyWet = () => {
      let wetCount = this.state.day.nappy_potty.wet
      const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, wet: (wetCount > 0 ? (wetCount - 1) : 0) }
        }
      }

      this.setState(newState)
      return fetch(`http://localhost:3000/api/v1/nappy_potties/${this.state.day.nappy_potty.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wet: (wetCount > 0 ? (wetCount - 1) : 0) })
      })
    }

    addNappyBM = (type) => {
      switch (type) {
        case 'normal': {
          let bmNormalCount = this.state.day.nappy_potty.bm_normal

          const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, bm_normal: (bmNormalCount ? (bmNormalCount + 1) : 1) }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/nappy_potties/${this.state.day.nappy_potty.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bm_normal: (bmNormalCount ? (bmNormalCount + 1) : 1) })
          })
        }

        case 'runny': {
          let bmRunnyCount = this.state.day.nappy_potty.bm_runny

          const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, bm_runny: (bmRunnyCount ? (bmRunnyCount + 1) : 1) }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/nappy_potties/${this.state.day.nappy_potty.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bm_runny: (bmRunnyCount ? (bmRunnyCount + 1) : 1) })
          })
        }

        case 'hard': {
          let bmHardCount = this.state.day.nappy_potty.bm_hard

          const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, bm_hard: (bmHardCount ? (bmHardCount + 1) : 1) }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/nappy_potties/${this.state.day.nappy_potty.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bm_hard: (bmHardCount ? (bmHardCount + 1) : 1) })
          })
        }
      }
    }

    removeNappyBM = (type) => {
      switch (type) {
        case 'normal': {
          let bmNormalCount = this.state.day.nappy_potty.bm_normal

          const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, bm_normal: (bmNormalCount > 0 ? (bmNormalCount - 1) : 0) }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/nappy_potties/${this.state.day.nappy_potty.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bm_normal: (bmNormalCount > 0 ? (bmNormalCount - 1) : 0) })
          })
        }

        case 'runny': {
          let bmRunnyCount = this.state.day.nappy_potty.bm_runny

          const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, bm_runny: (bmRunnyCount > 0 ? (bmRunnyCount - 1) : 0) }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/nappy_potties/${this.state.day.nappy_potty.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bm_runny: (bmRunnyCount > 0 ? (bmRunnyCount - 1) : 0) })
          })
        }

        case 'hard': {
          let bmHardCount = this.state.day.nappy_potty.bm_hard

          const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, bm_hard: (bmHardCount > 0 ? (bmHardCount - 1) : 0) }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/nappy_potties/${this.state.day.nappy_potty.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bm_hard: (bmHardCount > 0 ? (bmHardCount - 1) : 0) })
          })
        }
      }
    }

    addFood = () => {
      if (!this.state.food) {
        return fetch('http://localhost:3000/api/v1/foods', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ day_id: this.state.day.id })
        })
          .then(res => res.json())
          .then(food => this.setState({ food }))
      }
    }

    addFoodHad = (value, type) => {
      switch (type) {
        case 'breakfast': {
          const newState = { day:
        { ...this.state.day,
          food: { ...this.state.day.food, breakfast_had: value }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/foods/${this.state.day.food.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ breakfast_had: value })
          })
        }

        case 'am_snack': {
          const newState = { day:
        { ...this.state.day,
          food: { ...this.state.day.food, am_snack_had: value }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/foods/${this.state.day.food.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ am_snack_had: value })
          })
        }

        case 'lunch': {
          const newState = { day:
        { ...this.state.day,
          food: { ...this.state.day.food, lunch_had: value }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/foods/${this.state.day.food.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lunch_had: value })
          })
        }

        case 'pm_snack': {
          const newState = { day:
        { ...this.state.day,
          food: { ...this.state.day.food, pm_snack_had: value }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/foods/${this.state.day.food.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pm_snack_had: value })
          })
        }

        case 'dinner_tea': {
          const newState = { day:
        { ...this.state.day,
          food: { ...this.state.day.food, dinner_tea_had: value }
        }
          }
          this.setState(newState)

          return fetch(`http://localhost:3000/api/v1/foods/${this.state.day.food.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dinner_tea_had: value })
          })
        }
      }
    }

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

          {this.state.presence &&
            <div>
              <NapsList
                day={this.state.day}
                kid={this.props.kid}
              />
              <NappyPotty
                addNappy={this.addNappy}
                addNappyWet={this.addNappyWet}
                removeNappyWet={this.removeNappyWet}
                addNappyBM={this.addNappyBM}
                removeNappyBM={this.removeNappyBM}
                nappy={this.state.day.nappy_potty}
              />
              <Food
                addFood={this.addFood}
                addFoodHad={this.addFoodHad}
                food={this.state.day.food}
              />

            </div>
          }

        </div>
      )
    }
}

export default Kid
