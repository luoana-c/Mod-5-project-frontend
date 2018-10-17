import React from 'react'
import { Button, Form, Label, Input } from 'semantic-ui-react'
import API from '../API'

class ParentsList extends React.Component {
    state = {
      parents: this.props.kid ? this.props.kid.parents : [],
      showParentForm: false,
      email: '',
      password: '',
      name: '',
      phoneNumber: '',
      address: ''
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
    cancelParentForm = () => {
      this.setState({ showParentForm: false })
    }

    addParent = (name, email, password, phoneNumber, address, e) => {
      // this creates the nap instance in the backend, when the addNap button is first clicked
      // it adds the new nap to the state of NapsList
      e.preventDefault()
      this.setState({ showParentForm: false })
      return fetch(API.baseURL + `/kids/${this.props.kid.id}/parents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          name,
          phone_number: phoneNumber,
          address
        })
      })
        .then(res => res.json())
        .then(kid => { this.props.editKid(kid) })
    }

     deleteParent = (email) => {
       return fetch(API.baseURL + `/kids/${this.props.kid.id}/parents/${email}`, {
         method: 'DELETE' })
     }

     handleChange = (e) => {
       this.setState({
         [e.target.name]: e.target.value
       })
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
           {this.props.kid.parents && this.props.kid.parents.map(parent =>
             <div key={parent.id} >
               <h3>{parent.name && parent.name}</h3>
               <p>Email: {parent.email}</p>
               <p>{parent.phone_number && `Phone: ${parent.phone_number}`}</p>
               <p>{parent.address && `Address: ${parent.address}`}</p>
               <Button circular onClick={() => this.deleteParent(parent.email)} icon='trash alternate outline' />
             </div>
           )}
           {this.state.showParentForm &&
           <Form className='add-parent-form'>
             <Form.Field>
               <Label>Enter parent's full name</Label>
               <Input name='name' value={this.state.name} placeholder='Full name' onChange={this.handleChange} />
             </Form.Field>
             <Form.Field>
               <Label>Enter parent's phone number</Label>
               <Input name='phoneNumber' value={this.state.phoneNumber} placeholder='Phone number' onChange={this.handleChange} />
             </Form.Field>
             <Form.Field>
               <Label>Enter parent's address</Label>
               <Input name='address' value={this.state.address} placeholder='Address' onChange={this.handleChange} />
             </Form.Field>
             <br />
             <Form.Field>
               <Label>Enter an email</Label>
               <Input name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} />
             </Form.Field>
             <Form.Field>
               <Label>Create a password</Label>
               <Input name='password' value={this.state.password} type='password' placeholder='Password' onChange={this.handleChange} />
             </Form.Field>

             <Button
               onClick={(e) =>
                 this.addParent(this.state.name, this.state.email, this.state.password, this.state.phoneNumber, this.state.address, e)
               }
               type='submit'
             >Create parent</Button>
             <Button onClick={this.cancelParentForm}>Cancel</Button>
           </Form>
           }
           
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
