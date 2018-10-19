import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Label } from 'semantic-ui-react'
import API from '../../API'
import { withRouter, Link } from 'react-router-dom'

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
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>

        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <div className='sign-in-header'>
              Sign in or sign up to use the app.
            </div>
            <Form size='medium' className='signin-form'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} />
                <Form.Input fluid icon='lock' iconPosition='left' name='password' value={this.state.password} type='password' placeholder='Password' onChange={this.handleChange} />
         
                <Button fluid size='medium' onClick={() => this.handleClickOnSignIn()} type='submit'>Sign In</Button>
              </Segment>
            </Form>
            <br />
            <br />

            <Link to='/signup'>
            Sign up
            </Link>
          </Grid.Column>
        </Grid>

      </div>

    )
  }
}

export default withRouter(SignInForm)
