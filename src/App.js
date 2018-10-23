import React, { Component } from 'react'
import { Menu, Button, Icon, Sidebar, Segment, Image } from 'semantic-ui-react'
import { withRouter, Route, Switch, Link } from 'react-router-dom'

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
    sidebarVisible: false,
    selectedKid: undefined
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
    this.handleSidebarHide()
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

  setSelectedKid = id => {
    this.setState({
      selectedKid: id
    })
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
  linkToKidEdit = () => {
    this.state.currentUser && this.state.currentUser.childminder &&
    this.props.history.push(`/kids/${this.state.selectedKid}/edit`)
    this.handleSidebarHide()
  }

  linkToKidParents = () => {
    this.state.currentUser && this.state.currentUser.childminder &&
    this.props.history.push(`/kids/${this.state.selectedKid}/parents`)
    this.handleSidebarHide()
  }

  handleSidebarHide = () => this.setState({ sidebarVisible: false })

  sidebarButtons () {
    const pageURL = window.location.href
    const titleURL = require('./images/logo2.png')

    switch (pageURL) {
      case 'http://localhost:3001/kids':
        return (
          <div className='side-menu'>
            <div className='side-menu-title-div'>
              <Image src={titleURL} />
            </div>
            {this.state.currentUser &&
              this.state.currentUser.childminder &&
              <Link to='/new'>
                <Menu.Item as='a'onClick={this.handleSidebarHide}>Add a new child</Menu.Item>
              </Link>
            }
            <Menu.Item as='a' onClick={this.logoutUser}>Log out</Menu.Item>
          </div>
        )
      default:
        return (
          <div className='side-menu'>
            <div className='side-menu-title-div'>
              {/* <h1 className='app-title'>Pigtails Stories</h1> */}
              <Image src={titleURL} />
            </div>
            <Link to={'/kids'}>
              <Menu.Item onClick={this.handleSidebarHide}>Home</Menu.Item>
            </Link>
            {this.state.currentUser &&
              this.state.currentUser.childminder &&
            <>
              {/* <Link to={`/kids/${this.state.selectedKid}/edit`}> */}
              <Menu.Item onClick={this.linkToKidEdit}>Change child details</Menu.Item>
              {/* </Link> */}
              {/* <div> */}
              {/* <Link to={`/kids/${this.state.selectedKid}/parents`}> */}
              <Menu.Item onClick={this.linkToKidParents}>Parents</Menu.Item>
                {/* </Link> */}

              {/* </div> */}
            </>
            }
            <Menu.Item as='a' onClick={this.logoutUser}>Log out</Menu.Item>
          </div>
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
              <Menu secondary className='my-top-menu'>
                <Menu.Item icon='bars' onClick={this.toggleSidebarVisibility} className='menu-bars'></Menu.Item>

                <Menu.Item className='menu-welcome' >
                  {this.state.currentUser &&
                    `Welcome, ${this.state.currentUser.name ? this.state.currentUser.name : this.state.currentUser.email}`
                  }
                </Menu.Item>
              </Menu>
              {/* <BrowserRouter> */}

              <Switch>
                <Route exact path='/kids' component={props => this.state.currentUser ? this.state.currentUser.childminder ? <KidsList kids={this.state.kids} {...props} /> : <ParentsKidsList kids={this.state.kids} {...props} /> : <SignInPage handleUser={this.handleUser} {...props} />} />
                <Route path='/kids/:id/edit' component={props => this.state.kids.length > 0 ? <KidEditForm editKid={this.editKid} kid={this.selectKid(props.match.params.id)} {...props} /> : <Loading />} />
                <Route path='/kids/:id/parents' component={props => this.state.kids.length > 0 ? <ParentsList editKid={this.editKidInState} kid={this.selectKid(props.match.params.id)} {...props} /> : <Loading />} />
                <Route path='/kids/:id' render={props => this.state.kids.length > 0 ? <Kid setSelectedKid={this.setSelectedKid} kid={this.selectKid(props.match.params.id)} currentUser={this.state.currentUser} {...props} /> : <Loading />} />
                {/* render istead of component so that when I open the side menu it doesn't rerender the page and change the date */}
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
