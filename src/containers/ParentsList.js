import React from 'react'
import { Button, Image, Icon, Form, Label } from 'semantic-ui-react'
import API from '../API'

class ParentsList extends React.Component {
    state = {
      parents: this.props.kid ? this.props.kid.parents : [],
      showParentForm: false
    }

    componentDidMount () {
      console.log('component did mount, kid id: ' + this.props.kid.id)
    }

    // getParents = () => {
    //   return fetch(API.baseURL + `/kids/${this.props.kid.id}/days/${this.props.day.date}`)
    //     .then(res => res.json())
    //     .then(day => {
    //       if (day.naps) {
    //         let sortedNaps = day.naps.sort((nap1, nap2) => {
    //           return (nap1.id - nap2.id)
    //         })
    //         this.setState({ naps: sortedNaps })
    //       }
    //     })
    // }
    showParentForm = () => {
      this.setState({ showParentForm: true })
    }

    addParent = (email, password) => {
      // this creates the nap instance in the backend, when the addNap button is first clicked
      // it adds the new nap to the state of NapsList
      this.setState({ showParentForm: false })
      return fetch(API.baseURL + `/kids/${this.props.kid.id}/parents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(kid => { this.props.editKid(kid) })
    }

     deleteParent = (email) => {
       return fetch(API.baseURL + `/kids/${this.props.kid.id}/parents/${email}`, {
         method: 'DELETE' })
     }

     render () {
       //    const fileName = this.props.kid.gender
       //    const imageUrl = require(`../images/${fileName}.svg`)
       return (
         <div>
           {/* <Image
             alt=''
             src={imageUrl}
             height='50'
             width='50'
           />
           <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
             {this.props.kid.first_name} {this.props.kid.last_name}
           </span> */}
           <Button circular onClick={this.showParentForm} >
            Add a parent
           </Button>

           {this.state.showParentForm &&
           <Form className='add-parent-form'>
             <Form.Field>
               <Label>Enter an email</Label>
               <input name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} />
             </Form.Field>
             <Form.Field>
               <Label>Create a password</Label>
               <input name='password' value={this.state.password} type='password' placeholder='Password' onChange={this.handleChange} />
             </Form.Field>

             <Button onClick={() => this.handleClickOnSignUp()} type='submit'>Sign Up</Button>
           </Form>
           }
           {this.props.kid.parents && this.props.kid.parents.map(parent =>
             <div>
               <h3>{parent.name && `Phone: ${parent.name}`}</h3>
               <p>Email: {parent.email}</p>
               <p>{parent.phone_number && `Phone: ${parent.phone_number}`}</p>
               <p>{parent.address && `Address: ${parent.address}`}</p>
             </div>
           )}
           {/* {this.state.naps && this.state.naps.map(nap =>
            <
              changeNapStartTime={this.changeNapStartTime}
              changeNapEndTime={this.changeNapEndTime}
              deleteNap={this.deleteNap}
              day={this.props.day}
              nap={nap}
              key={nap.id}
            />
          )} */}
           {/* <p>Nap: { this.state.naps.length > 0 ? moment.utc(this.state.naps[0].start).local().format('HH:mm') : "N/A" }</p> */}
         </div>
       )
     }
}

export default ParentsList
