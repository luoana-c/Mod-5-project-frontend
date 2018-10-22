import React, { Component } from 'react'
import { Form, Button, Label, Grid, Image, Segment } from 'semantic-ui-react'

import API from '../../API'

class SignUpForm extends Component {
    state = {
      email: '',
      password: '',
      name: '',
      phoneNumber: '',
      address: ''
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

  handleClickOnSignUp = () => {
    API.signup(this.state.name, this.state.email, this.state.password, this.state.phoneNumber, this.state.address)
      .then(resp => this.props.handleUser(resp))
      .then(() => this.props.history.push('/kids'))
  }

  render () {
    const titleURL = require('../../images/logo2.png')
    return (
      <div className='sign-up-form'>
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <div className='logo-on-forms'>
          <Image src={titleURL} className='logo-image' />
        </div>

        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <div className='sign-up-header'>
              <h3>If you are a childminder (or a nursery), please create an account to start using the app.</h3>
              <p>Parent accounts can only be created by a childminder or a nursery.</p>
            </div>
            <Form size='medium' className='signin-form'>
              <Segment stacked>
                <Form.Field>
                  {/* <Label>Enter your full name</Label> */}
                  <Form.Input fluid icon='user' iconPosition='left' name='name' value={this.state.name} placeholder='Full name' onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  {/* <Label>Enter your phone number</Label> */}
                  <Form.Input fluid icon='phone' iconPosition='left' name='phoneNumber' value={this.state.phoneNumber} placeholder='Phone number' onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  {/* <Label>Enter your address</Label> */}
                  <Form.Input fluid icon='home' iconPosition='left' name='address' value={this.state.address} placeholder='Address' onChange={this.handleChange} />
                </Form.Field>
                <br />
                <Form.Field>
                  {/* <Label>Enter your email</Label> */}
                  <Form.Input fluid icon='mail' iconPosition='left' name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  {/* <Label>Create a password</Label> */}
                  <Form.Input fluid icon='lock' iconPosition='left' name='password' value={this.state.password} type='password' placeholder='Password' onChange={this.handleChange} />
                </Form.Field>
                {/* <Form.Field>
            <Checkbox label={<label>Tick this if you are a childminder</label>} />
          </Form.Field> */}
                <Button fluid size='medium' onClick={() => this.handleClickOnSignUp()} type='submit'>Sign Up</Button>
              </Segment>
            </Form>
            <br />
            <br />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
export default SignUpForm
