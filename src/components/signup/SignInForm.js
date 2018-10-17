import React, { Component } from 'react'
import { Form, Button, Label } from 'semantic-ui-react'
import API from '../../API'
import { withRouter } from 'react-router-dom'

class SignInForm extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClickOnSignIn = () => {
    // this.props.handleItemClick('Explore')
    API.signin(this.state.email, this.state.password)
      .then(resp => resp.id ? this.handleCorrectSignIn(resp) : this.props.history.push('/signin'))
      // .then(() => this.props.history.push('/kids'))
  }

  handleCorrectSignIn = (resp) => {
    this.props.handleUser(resp)
    this.props.history.push('/kids')
  }

  // API.signin(this.state.email, this.state.password).then(resp => this.props.handleUser(resp))}
  // // onClick={() => this.props.handleItemClick('Sign In')}

  render () {
    return (
      <div className='sign-in-form'>
        <div className='sign-in-header'>
              Sign in or sign up to use the app.
        </div>
        <Form className='signin-form'>
          <Form.Field>
            <Label>Enter your email</Label>
            <input name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <Label>Enter your password</Label>
            <input name='password' value={this.state.password} type='password' placeholder='Password' onChange={this.handleChange} />
          </Form.Field>

          <Button onClick={() => this.handleClickOnSignIn()} type='submit'>Sign In</Button>
        </Form>
        <br />
        <br />

      </div>

    )
  }
}

export default withRouter(SignInForm)
