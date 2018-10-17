import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import SignInForm from './SignInForm'
import { Link } from 'react-router-dom'


class SignInPage extends Component {

  // signIn(email, password) {
  //   API.signIn(email,password)
  //     .then(userData => {
  //       this.props.setCurrentUser(userData)
  //     })
  // }

  // signUp () {

  // }

  render() {
    return (
      <div >
        <div >
          <SignInForm handleUser={this.props.handleUser} handleItemClick={this.props.handleItemClick}/>
          <Link to='/signup'>
            <Button >Sign up</Button>
          </Link>
        </div>
      </div>
    )
  }
}



export default SignInPage

// {
//   this.props.handleUser ?
//   <LogOutForm /> :
//   <div className="forms">
//   <SignInForm onSubmit={this.signIn} handleUser={this.props.handleUser} />
//   <SignUpForm onSubmit={this.signUp} handleUser={this.props.handleUser}/>
// </div>
// }