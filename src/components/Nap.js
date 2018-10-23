import React from 'react'
import { Button, Grid, Divider } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import '../containers/NapsList.js'
import '../containers/NapsList.css'

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
            
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            // endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={10}
            dateFormat='HH:mm'
            timeFormat='HH:mm'
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

            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.endDate}
            // endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={10}
            dateFormat='HH:mm'
            timeFormat='HH:mm'
            timeCaption='Time'
            minTime={moment().utc().hours(7).minutes(0)}
            maxTime={moment().utc().hours(20).minutes(30)}
          />
        )
      }
    }

    handleChangeStart = (date) => {
      console.log(date, date.isUTC())
      // this calls the function in NapsList, which updates the start time in the backend when start time is changed
      this.setState({ startDate: date })
      this.props.changeNapStartTime(this.props.nap, date.format().split('+')[0])
    }

    handleChangeEnd = (date) => {
      // this calls the function in NapsList, which updates the end time in the backend when end time is changed
      this.setState({ endDate: date })
      this.props.changeNapEndTime(this.props.nap, date.format().split('+')[0])
    }

    render () {
      // const duration = this.props.nap.end && moment.duration(moment(this.props.nap.end, 'HH:mm').diff(moment(this.props.nap.start, 'HH:mm')))
      let start = this.props.nap.start && moment(this.props.nap.start).set(new Date(this.props.day.date))
      let end = this.props.nap.end && moment(this.props.nap.end).set(new Date(this.props.day.date))
      let diff = this.props.nap.end && moment.duration(end.diff(start))

      return (
        <>
          <Grid verticalAlign='top' className='napGrid' columns={4}>
            <Grid.Row className='napRow'>
              <Grid.Column>
                <Button circular onClick={() =>
                  (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) &&
                  this.props.currentUser.childminder &&
                    // TODO: check what happends if these buttons are clicked again and again. Override start time, or?
                    this.props.changeNapStartTime(this.props.nap, moment().format())
                      .then(this.setState({ startDate: moment(), showStartNapPicker: true }))
                } icon='play'
                />

                <div className='nap-time'>
                  {this.state.showStartNapPicker && this.startNapPicker()}
                </div>

                <p className='timeLabel'> {this.props.nap.start && `${moment(this.props.nap.start).format('HH:mm')}`}</p>

              </Grid.Column>

              <Grid.Column>
                <Button circular onClick={() =>
                  (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) &&
            this.props.currentUser.childminder &&
              this.props.changeNapEndTime(this.props.nap, moment().format())
                .then(this.setState({ endDate: moment(), showEndNapPicker: true }))
                } icon='stop' />

                <div className='nap-time'>
                  {this.state.showEndNapPicker && this.endNapPicker()}
                </div>
                <p className='timeLabel'>{this.props.nap.end && `${moment(this.props.nap.end).format('HH:mm')}` }</p>
              </Grid.Column>

              <Grid.Column>
                <div>
                  {/* <h3 className='duration'>{this.props.nap.duration && `${this.props.nap.duration}` }</h3> */}
                  {/* <h3 className='duration'>{this.props.nap.end && `Total ${duration}` }</h3> */}
                  <h3 className='duration'>{this.props.nap.end && diff.hours() >= 0 && diff.minutes() >= 0 && `Total ${diff.hours()}:${diff.minutes()}` }</h3>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>
                  {
                    <Button
                      className='my-delete-buttons'
                      circular onClick={() =>
                        this.props.currentUser.childminder &&
                          this.props.deleteNap(this.props.nap)}
                      icon='trash alternate outline' />
                  }
                </div>
              </Grid.Column>

            </Grid.Row>
          </Grid>
          <Divider />
        </>
      )
    }
}

export default Nap
