import React from 'react'
import { Image, Button, Grid } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'

import API from '../API'
import NapsList from './NapsList'
import NappyPotty from '../components/NappyPotty'
import Food from '../components/Food'

import Pusher from 'pusher-js'
import './NapsList.css'

Pusher.logToConsole = true

const pusher = new Pusher('88d92ad5597d2ebdbc7e', {
  cluster: 'eu',
  forceTLS: true
})

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

      const channel = pusher.subscribe('my-channel')
      channel.bind('my-event', data => {
        this.setState({ day: JSON.parse(data.message) })
      })

      // this.getDay()
    }

    getDay = (date) => {
      return fetch(API.baseURL + `/kids/${this.props.kid.id}/days/${date.format('YYYY-MM-DD')}`)
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
      return fetch(API.baseURL + '/days', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kid_id: this.props.kid.id, date: this.state.startDate.format('YYYY-MM-DD') })
      })
        .then(res => res.json())
        .then(day => this.setState({ day }))
    }
    togglePresence = () => {
      if (this.state.startDate.format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
        // TODO: https://momentjs.com/docs/#/query/is-same/ (cu parametru pt granularitate)
        this.setState({ presence: !this.state.presence })
        this.createDay()
      }
    }

    addNappy = () => {
      if (this.state.startDate.format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
        if (!this.state.day.nappy_potty) {
          return fetch(API.baseURL + '/nappy_potties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ day_id: this.state.day.id })
          })
            .then(res => res.json())
            .then(day => this.setState({ day }))
        }
      }
    }

    addNappyWet = () => {
      if (this.state.startDate.format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
        let wetCount = this.state.day.nappy_potty.wet

        const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, wet: (wetCount ? (wetCount + 1) : 1) }
        }
        }
        // console.log('new kid state:', newState)
        this.setState(newState)

        console.log(this.state.day.nappy_potty.id)
        return fetch(API.baseURL + `/nappy_potties/${this.state.day.nappy_potty.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wet: (wetCount ? (wetCount + 1) : 1) })
        })
      }
    }

    removeNappyWet = () => {
      if (this.state.startDate.format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
        let wetCount = this.state.day.nappy_potty.wet
        const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, wet: (wetCount > 0 ? (wetCount - 1) : 0) }
        }
        }

        this.setState(newState)
        return fetch(API.baseURL + `/nappy_potties/${this.state.day.nappy_potty.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wet: (wetCount > 0 ? (wetCount - 1) : 0) })
        })
      }
    }

    addNappyBM = (type) => {
      if (this.state.startDate.format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
        switch (type) {
          case 'normal': {
            let bmNormalCount = this.state.day.nappy_potty.bm_normal

            const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, bm_normal: (bmNormalCount ? (bmNormalCount + 1) : 1) }
        }
            }
            this.setState(newState)

            return fetch(API.baseURL + `/nappy_potties/${this.state.day.nappy_potty.id}`, {
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

            return fetch(API.baseURL + `/nappy_potties/${this.state.day.nappy_potty.id}`, {
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

            return fetch(API.baseURL + `/nappy_potties/${this.state.day.nappy_potty.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ bm_hard: (bmHardCount ? (bmHardCount + 1) : 1) })
            })
          }
        }
      }
    }

    removeNappyBM = (type) => {
      if (this.state.startDate.format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
        switch (type) {
          case 'normal': {
            let bmNormalCount = this.state.day.nappy_potty.bm_normal

            const newState = { day:
        { ...this.state.day,
          nappy_potty: { ...this.state.day.nappy_potty, bm_normal: (bmNormalCount > 0 ? (bmNormalCount - 1) : 0) }
        }
            }
            this.setState(newState)

            return fetch(API.baseURL + `/nappy_potties/${this.state.day.nappy_potty.id}`, {
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

            return fetch(API.baseURL + `/nappy_potties/${this.state.day.nappy_potty.id}`, {
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

            return fetch(API.baseURL + `/nappy_potties/${this.state.day.nappy_potty.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ bm_hard: (bmHardCount > 0 ? (bmHardCount - 1) : 0) })
            })
          }
        }
      }
    }

    addFood = () => {
      if (this.state.startDate.format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
        if (!this.state.food) {
          return fetch(API.baseURL + '/foods', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ day_id: this.state.day.id })
          })
            .then(res => res.json())
            .then(day => this.setState({ day }))
        }
      }
    }

    addFoodHad = (value, type) => {
      if (this.state.startDate.format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
        switch (type) {
          case 'breakfast': {
            const newState = { day:
        { ...this.state.day,
          food: { ...this.state.day.food, breakfast_had: value }
        }
            }
            this.setState(newState)
            console.log('this.state.day.food.id: ' + this.state.day.food.id)
            return fetch(API.baseURL + `/foods/${this.state.day.food.id}`, {
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

            return fetch(API.baseURL + `/foods/${this.state.day.food.id}`, {
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

            return fetch(API.baseURL + `/foods/${this.state.day.food.id}`, {
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

            return fetch(API.baseURL + `/foods/${this.state.day.food.id}`, {
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

            return fetch(API.baseURL + `/foods/${this.state.day.food.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ dinner_tea_had: value })
            })
          }
        }
      }
    }

    render = () => {
      const fileName = this.props.kid.gender
      const imageUrl = require(`../images/${fileName}.svg`)
      const foodURL = require('../images/135028-baby-collection/svg/feeding-1.svg')

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
          {this.props.currentUser.childminder &&
            <Link to={`/kids/${this.props.kid.id}/edit`}><Button>Edit child info</Button></Link>
          }
          {this.props.currentUser.childminder &&
            <Link to={`/kids/${this.props.kid.id}/parents`}><Button>Parents</Button></Link>
          }

          <Grid verticalAlign='middle' centered columns={2}>
            <Grid.Column className='kid-pic'width={3}>
              <Image
                alt=''
                src={imageUrl}
                height='50'
                width='50'
              />
            </Grid.Column>

            <Grid.Column>
              <p className='kid-name'>{this.props.kid.first_name} {this.props.kid.last_name}</p>
              <p>Age: {this.props.kid.age_years} year(s) {this.props.kid.age_months} month(s)</p>
            </Grid.Column>
          </Grid>

          {this.props.currentUser.childminder &&
            <Button toggle active={this.state.presence} onClick={this.togglePresence}>
              {this.state.presence ? 'Mark as absent' : 'Mark as present'}
            </Button>
          }

          {this.state.presence &&
            <div>
              <div className='item-list'>
                <NapsList
                  pusher={pusher}
                  currentUser={this.props.currentUser}
                  day={this.state.day}
                  kid={this.props.kid}
                />
              </div>
              <div className='item-list'>
                <NappyPotty
                  currentUser={this.props.currentUser}
                  addNappy={this.addNappy}
                  addNappyWet={this.addNappyWet}
                  removeNappyWet={this.removeNappyWet}
                  addNappyBM={this.addNappyBM}
                  removeNappyBM={this.removeNappyBM}
                  nappy={this.state.day.nappy_potty}
                />
              </div>
              <div className='item-list'>
                <Image alt='' src={foodURL} height='50' width='50' />
                {this.props.currentUser.childminder &&
                <Button circular onClick={this.addFood}>
                  Add food
                </Button>
                }
                {this.state.day.food &&
                <Food
                  currentUser={this.props.currentUser}
                  addFood={this.addFood}
                  addFoodHad={this.addFoodHad}
                  food={this.state.day.food}
                  day={this.state.day}
                />
                }
              </div>

            </div>
          }

        </div>
      )
    }
}

export default Kid
