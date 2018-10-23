import React from 'react'
import { Form, Label, Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class KidNewForm extends React.Component {
    state = {
      genderValue: '',
      startDate: moment().startOf('day')
    }

    handleChangeGender = (e, { value }) => this.setState({ genderValue: value })
    handleChangeFirstName = (e, { value }) => this.setState({ firstName: value })
    handleChangeLastName = (e, { value }) => this.setState({ lastName: value })
    handleChangeDateOfBirth = (date) => this.setState({ startDate: date })

    render () {
      return (
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <h3 className='sign-in-header'>
              Add a new child to your list
            </h3>
            <Form size='medium' className='signin-form'>
              <Segment stacked>
                {/* <Form.Group> */}
                <Form.Input label='First name' placeholder='First name' onChange={this.handleChangeFirstName} />
            {/* </Form.Group> */}
                {/* <Form.Group> */}
                <Form.Input label='Last name' placeholder='Last name' onChange={this.handleChangeLastName} />
                {/* </Form.Group> */}

            {/* <Form.Group> */}
                <Label>Gender</Label>
                <Form.Radio
                  label='girl'
                  value='girl'
                  checked={this.state.genderValue === 'girl'}
                  onChange={this.handleChangeGender}
                />
                <Form.Radio
                  label='boy'
                  value='boy'
                  checked={this.state.genderValue === 'boy'}
                  onChange={this.handleChangeGender}
                />
                {/* </Form.Group>
          <Form.Group> */}
                <Label>Date of birth:</Label>
                <DatePicker
                  dateFormat='DD/MM/YYYY'
                  selected={this.state.startDate}
                  onChange={this.handleChangeDateOfBirth}
                  maxDate={moment()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  //   placeholderText='Select a date of birth'
                />
                {/* </Form.Group> */}
                <br />
                <Link to='/kids'>
                  <Form.Button onClick={() => this.props.createKid(this.state.firstName, this.state.lastName, this.state.genderValue, this.state.startDate)}>Add child</Form.Button>
                </Link>
              </Segment>
            </Form>
            <br />
            <Link to={'/kids'} className='signup'>
              Cancel
            </Link>

          </Grid.Column>
        </Grid>
      )
    }
}

export default KidNewForm
