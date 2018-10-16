import React from 'react'
import { Image, Button, Checkbox, Form, Field } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class KidNewForm extends React.Component {
    state = {
      genderValue: ''
    }

    handleChangeGender = (e, { value }) => this.setState({ genderValue: value })

    render () {
      return (
        <Form>
          <Form.Group>
            <Form.Input label='First name' placeholder='First name' />
          </Form.Group>
          <Form.Group>
            <Form.Input fluid label='Last name' placeholder='Last name' />
          </Form.Group>

          <Form.Group>
            <label>Gender</label>
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

          </Form.Group>
          <Link to='/kids'>
            <Form.Button>Create child</Form.Button>
          </Link>
        </Form>
      )
    }
}

export default KidNewForm
