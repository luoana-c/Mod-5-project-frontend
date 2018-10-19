import React, { Component } from 'react'

import SignInForm from './SignInForm'

class SignInPage extends Component {
  // signIn(email, password) {
  //   API.signIn(email,password)
  //     .then(userData => {
  //       this.props.setCurrentUser(userData)
  //     })
  // }

  // signUp () {

  // }

  render () {
    return (
      <div >

        <SignInForm handleUser={this.props.handleUser} handleItemClick={this.props.handleItemClick} />
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
