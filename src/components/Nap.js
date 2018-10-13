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

    // addNapStart = () => {

    // }

    handleChangeStart = (date) => {
      // this calls the function in NapsList, which updates the start time in the backend when start time is changed
      this.setState({ startDate: date })
      this.props.changeNapStartTime(this.props.nap, date)
    }

    handleChangeEnd = (date) => {
      // this calls the function in NapsList, which updates the end time in the backend when end time is changed
      this.setState({ endDate: date })
      this.props.changeNapEndTime(this.props.nap, date)
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

          <Button circular onClick={() =>
          // TODO: check what happends if these buttons are clicked again and again. Override start time, or?
            this.props.addNapStartTime(this.props.day, moment().format('HH:mm'))
              .then(this.setState({ startDate: moment(), showStartNapPicker: true }))
          } icon='play'
          />
          {this.state.showStartNapPicker && this.startNapPicker()}

          <Button circular onClick={() => 
            this.props.addNapEndTime(this.props.nap, moment().format('HH:mm'))
              .then(this.setState({ endDate: moment(), showEndNapPicker: true }))
          } icon='stop' />
          {this.state.showEndNapPicker && this.endNapPicker()}

          <Button circular onClick={this.deleteNap} icon='trash alternate outline' />

        </div>

      )
    }
}

export default Nap
