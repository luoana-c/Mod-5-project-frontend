import React from 'react'
import { Image, Button, Icon, Divider } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class Nap extends React.Component {
    state = {
      startDate: moment(),
      endDate: moment(),
      showStartNapPicker: false,
      showEndNapPicker: false
    }

    handleChangeStart = (date) => {
      this.setState({ startDate: date })
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
          dateFormat="HH:mm"
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
            dateFormat="HH:mm"
            timeCaption='Time'
            minTime={moment().hours(7).minutes(0)}
            maxTime={moment().hours(20).minutes(30)}
          />
        )
      }

    addNapStartTime = () => {
        this.setState({
            showStartNapPicker: true
        })
    }

    addNapEndTime = () => {
        this.setState({
            showEndNapPicker: true
        })
    }


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
         
          <Button onClick={this.addNapStartTime} icon labelPosition='left'>
            <Icon name='play' />
                Start nap
          </Button>

          {this.state.showStartNapPicker && this.startNapPicker()}
          
          <Button onClick={this.addNapEndTime} icon labelPosition='left'>
            <Icon name='stop' />
                End nap
          </Button>

          {this.state.showEndNapPicker && this.endNapPicker()}

        </div>

      )
    }
}

export default Nap
