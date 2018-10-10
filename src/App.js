import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import ChildrenList from './containers/ChildrenList'


import './App.css'

class App extends Component {
  state = {
    children: []
  }

  componentDidMount () {
    this.getChildren()
  }

  getChildren = () => {
    return fetch('http://localhost:3000/api/v1/users/1')
      .then(res => res.json())
      .then(user => this.setState({children: user.children}))
  }

  render () {
    return (
      <div className='App'>
        <div className='title-header'>
          <Header as='h1'>Pigtails Stories</Header>
        </div>
        <ChildrenList children={this.state.children}/>
      </div>
    )
  }
}

export default App
