import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

import API from '../../API'


class SignUpForm extends Component {

    state = {
      email: '',
      password: ''
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }



  handleClickOnSignUp = () => {
    API.signup(this.state.email, this.state.password)
      .then(resp => this.props.handleUser(resp))
      .then(() => this.props.history.push('/kids'))
  }

  render () {
    return (
      <div className="sign-up-form">
        <div className="sign-up-header"> 
          If you are a childminder (or a nursery), please create an account to start using the app. 
          Parent accounts can only be created by a childminder or a nursery.
        </div>
        <Form className="sign-up-form">
          <Form.Field>
            <input name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <input name='password' value={this.state.password} type='password' placeholder='Password' onChange={this.handleChange} />
          </Form.Field>
          {/* <Form.Field>
            <Checkbox label={<label>Tick this if you are a childminder</label>} />
          </Form.Field> */}
          <Button onClick={() => this.handleClickOnSignUp()} type='submit'>Sign Up</Button>
        </Form>
        <br/>
        <br/>
      </div>
    )
  }
}
export default SignUpForm