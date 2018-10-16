import React, { Component } from 'react'
import { Header, Sidebar, Menu, Segment, Icon, Button, Divider } from 'semantic-ui-react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import KidsList from './containers/KidsList'
import Kid from './containers/Kid'
import KidNewForm from './components/KidNewForm'

import './App.css'
import Loading from './components/Loading'

class App extends Component {
  state = {
    kids: [],
    currentUser: undefined, 
    sidebarVisible: false
  }

  componentDidMount () {
    this.getKids()
  }

  getKids = () => {
    // TODO: change hardcoded user
    return fetch('http://localhost:3000/api/v1/users/1')
      .then(res => res.json())
      .then(user => this.setState({ kids: user.kids }))
  }

  selectKid = (id) => {
    return this.state.kids.find(kid => kid.id === parseInt(id, 10))
  }

  createKid = (first_name, last_name) => {
    // TODO: change hardcoded user
    
    return fetch('http://localhost:3000/api/v1/kids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 1, first_name: first_name, last_name: last_name })
    }) 
    .then(res => res.json())
    .then(kid => this.addKidToState(kid))
  }

  addKidToState = (kid) => {
    if (this.state.kids) {
      let newKidArray = [...this.state.kids, kid]
      this.setState({ kids: newKidArray })
    } else {
      let newKidArray = [kid]
      this.setState({ kids: newKidArray })
    }

  }

  toggleSidebarVisibility = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    })
  }

  handleSidebarHide = () => this.setState({ sidebarVisible: false })

  sidebarButtons () {
    const pageURL = window.location.href

    switch (pageURL) {
      case 'http://localhost:3001/kids':
        return (
          <>
            <Menu.Item as='a'>Change personal details</Menu.Item>
            <Menu.Item as='a'>Log out</Menu.Item>
          </>
        )
      default:
        return (
          <>
            <Menu.Item as='a'>Home</Menu.Item>
            <Menu.Item as='a'>Change child details</Menu.Item>
            <Menu.Item as='a'>Parents</Menu.Item>
            <Menu.Item as='a'>Log out</Menu.Item>
          </>
        )
    }
  }

  render () {
    return (
      <div className='App'>
        {/* <div className='title-header'>
          <Header as='h1'>Pigtails Stories</Header>
        </div> */}
        {/* <Button icon onClick={this.toggleSidebarVisibility}><Icon name='bars' /></Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            // inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.sidebarVisible}
            width='thin'
          >

            {this.sidebarButtons()}
          </Sidebar>

          <Sidebar.Pusher> */}
        <div className='content'>
          
          <BrowserRouter>
            
            <Switch>
            
              <Route exact path='/kids' component={props => <KidsList kids={this.state.kids} {...props} />} />
              <Route path='/kids/:id' component={props => this.state.kids.length > 0 ? <Kid kid={this.selectKid(props.match.params.id)} {...props} /> : <Loading />} />
              <Route exact path='/new' component={props => <KidNewForm {...props} />} />

            </Switch>
          </BrowserRouter>
        </div>
        {/* </Sidebar.Pusher>
        </Sidebar.Pushable> */}
      </div>
    )
  }
}

export default App
