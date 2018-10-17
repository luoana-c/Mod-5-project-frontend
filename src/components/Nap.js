import React from 'react'
import { Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class Nap extends React.Component {
    state = {
      nap_id: undefined,
      startDate: moment().utc(),
      endDate: moment().utc(),
      showStartNapPicker: false,
      showEndNapPicker: false
    }

    startNapPicker = () => {
      if (this.props.currentUser.childminder) {
        return (
          <DatePicker
            placeholderText='Click to select a date'
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            // endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            showTimeSelect
            utcOffset={0}
            showTimeSelectOnly
            timeIntervals={10}
            dateFormat='HH:mm'
            timeCaption='Time'
            minTime={moment().utc().hours(7).minutes(0)}
            maxTime={moment().utc().hours(20).minutes(30)}
          />
        )
      }
    }

    endNapPicker = () => {
      if (this.props.currentUser.childminder) {
        return (
          <DatePicker
            placeholderText='Click to select a date'
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.endDate}
            // endDate={this.state.endDate}
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
    }

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

    render () {
      return (
        <div>
          {(moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) &&
            this.props.currentUser.childminder &&
              <Button circular onClick={() =>
              // TODO: check what happends if these buttons are clicked again and again. Override start time, or?
                this.props.changeNapStartTime(this.props.nap, moment())
                  .then(this.setState({ startDate: moment(), showStartNapPicker: true }))
              } icon='play'
              />
          }
          {this.state.showStartNapPicker && this.startNapPicker()}
          <p>Start time: {this.props.nap.start && moment(this.props.nap.start).format('HH:mm') }</p>

          {(moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) &&
            this.props.currentUser.childminder &&
            <Button circular onClick={() =>
              this.props.changeNapEndTime(this.props.nap, moment())
                .then(this.setState({ endDate: moment(), showEndNapPicker: true }))
            } icon='stop' />
          }
          {this.state.showEndNapPicker && this.endNapPicker()}
          <p>End time: {this.props.nap.end && moment(this.props.nap.end).format('HH:mm') }</p>
          <h3>Duration: {this.props.nap.end && this.props.nap.duration }</h3>
          
          {this.props.currentUser.childminder &&
            <Button circular onClick={() => this.props.deleteNap(this.props.nap)} icon='trash alternate outline' />
          }

        </div>

      )
    }
}

export default Nap
