import React, { Component } from 'react'
import { Menu, Button, Icon, Sidebar, Segment } from 'semantic-ui-react'
import { withRouter, Route, Switch } from 'react-router-dom'

import API from './API'
import KidsList from './containers/KidsList'
import ParentsKidsList from './containers/ParentsKidsList'
import ParentsList from './containers/ParentsList'
import Kid from './containers/Kid'
import KidNewForm from './components/KidNewForm'
import KidEditForm from './components/KidEditForm'

import SignInPage from './components/signup/SignInPage'
import SignUpForm from './components/signup/SignUpForm'

import './App.css'
import Loading from './components/Loading'

class App extends Component {
  state = {
    kids: [],
    currentUser: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : undefined,
    sidebarVisible: false
  }

  componentDidMount () {
    if (window.localStorage.getItem('user')) {
      const user = JSON.parse(window.localStorage.getItem('user'))
      console.log('current user : ' + user.email)
      this.setState({ currentUser: { email: user.email, id: user.id, childminder: user.childminder, name: user.name ? user.name : undefined } }, function () {
        this.getKids(this.state.currentUser)
      })
    }
  }

  handleUser = (user) => {
    window.localStorage.setItem('user', JSON.stringify(user))
    this.setState({ currentUser: { email: user.email, id: user.id, childminder: user.childminder, name: user.name } }, function () {
      this.getKids(this.state.currentUser)
    })
  }

  logoutUser = () => {
    this.setState({ currentUser: undefined, kids: [] })
    window.localStorage.removeItem('user')
    this.props.history.push('/signin')
  }
  // getKids = () => {
  //   // TODO: change hardcoded user
  //   return fetch(API.baseURL + '/users/1')
  //     .then(res => res.json())
  //     .then(user => this.setState({ kids: user.kids }))
  // }

  getKids = (user) => {
    // TODO: change hardcoded user
    if (user) {
      return fetch(API.baseURL + `/users/${user.id}`)
        .then(res => res.json())
        .then(user => this.setState({ kids: user.kids }))
    }
  }

  selectKid = (id) => {
    return this.state.kids.find(kid => kid.id === parseInt(id, 10))
  }

  createKid = (firsName, lastName, gender, dateOfBirth) => {
    // TODO: form validation
    return fetch(API.baseURL + '/kids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: this.state.currentUser.id, first_name: firsName, last_name: lastName, gender, date_of_birth: dateOfBirth })
    })
      .then(res => res.json())
      .then(kid => this.addKidToState(kid))
  }

  editKid = (kidId, firstName, lastName, gender, dateOfBirth) => {
    return fetch(API.baseURL + `/kids/${kidId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, gender, date_of_birth: dateOfBirth })
    })
      .then(res => res.json())
      .then(kid => this.editKidInState(kid))
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
  editKidInState = (kid) => {
    const foundKid = this.state.kids.find(stateKid => stateKid.id === kid.id)
    const indexOfKidToChange = this.state.kids.indexOf(foundKid)

    const newKids = this.state.kids.slice()
    newKids.splice(indexOfKidToChange, 1, kid)

    this.setState({ kids: newKids })
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

          <Sidebar.Pusher>
            <div className='content'>
              <Button icon onClick={this.toggleSidebarVisibility}><Icon name='bars' /></Button>

              {this.state.currentUser &&
          <div>
            <Button onClick={this.logoutUser}>Log out</Button>
            <p>Welcome, {this.state.currentUser.name ? this.state.currentUser.name : this.state.currentUser.email }</p>
          </div>
              }

              {/* <BrowserRouter> */}

              <Switch>
                <Route exact path='/kids' component={props => this.state.currentUser.childminder ? <KidsList kids={this.state.kids} {...props} /> : <ParentsKidsList kids={this.state.kids} {...props} />} />
                <Route path='/kids/:id/edit' component={props => this.state.kids.length > 0 ? <KidEditForm editKid={this.editKid} kid={this.selectKid(props.match.params.id)} {...props} /> : <Loading />} />
                <Route path='/kids/:id/parents' component={props => this.state.kids.length > 0 ? <ParentsList editKid={this.editKidInState} kid={this.selectKid(props.match.params.id)} {...props} /> : <Loading />} />
                <Route path='/kids/:id' component={props => this.state.kids.length > 0 ? <Kid kid={this.selectKid(props.match.params.id)} currentUser={this.state.currentUser} {...props} /> : <Loading />} />
                <Route exact path='/new' component={props => <KidNewForm createKid={this.createKid} {...props} />} />
                <Route exact path='/signup' component={props => <SignUpForm handleUser={this.handleUser} {...props} />} />
                <Route exact path='/signin' component={props => <SignInPage handleUser={this.handleUser} {...props} />} />
              </Switch>
              {/* </BrowserRouter> */}
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default withRouter(App)
