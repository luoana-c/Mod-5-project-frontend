import React from 'react'
import { Image, Dropdown, Menu } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import NapsList from './NapsList'

class Kid extends React.Component {
    state = {
      naps: [
        {
          id: 1,
          day_id: 1,
          start: "11:00",
          end: "12:25",
          duration: "01:25"
        },
        {
          id: 2,
          day_id: 1,
          start: "15:10",
          end: "16:05",
          duration: "00:55"
        }
      ],
      startDate: moment()
    }

    handleChange = (date) => {
      this.setState({ startDate: date })
    }

    napButtons () {
      return (
        <>
          stuff
          <Image />
        </>
      )
    }
    
    render = () => {
      const fileName = this.props.kid.gender
      const imageUrl = require(`../images/${fileName}.svg`)
      
      return (
        <div>
          <DatePicker
            dateFormat="DD/MM/YYYY"
            selected={this.state.startDate}
            onChange={this.handleChange}
            filterDate={this.isWeekday}
            maxDate={moment()}
            placeholderText="Select a weekday" 
          />

          <Image
            alt=''
            src={imageUrl}
            height='50'
            width='50'
          />
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{this.props.kid.first_name} {this.props.kid.last_name}</span>
          <p>Age: {this.props.kid.age_years} year(s) {this.props.kid.age_months} month(s)</p>

          <div>
            <NapsList 
              napButtons={this.napButtons}
              naps={this.state.naps}
            />
          </div>
        </div>
      )
    }
}

export default Kid