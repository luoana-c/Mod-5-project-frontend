import React from 'react'
import { Button, Image, Dropdown, DropdownItem, Grid } from 'semantic-ui-react'
import './NappyPotty.css'

class NappyPotty extends React.Component {
  state = {
    showDropdown: false,
    showNappy: false,
    nappy: this.props.nappy && this.props.nappy
  }

  componentDidUpdate (prevProps) {
    // console.log('did update called')
    if (prevProps.day.id !== this.props.day.id && this.props.day.id) {
      this.refreshStateMethod()
    }

    if (JSON.stringify(prevProps.nappy) !== JSON.stringify(this.props.nappy) && this.props.nappy) {
      this.refreshStateMethod()
    }
  }

  refreshStateMethod = () => {
    this.setState({ nappy: this.props.nappy })
  }

  showDropdownButton = () => {
    this.setState({ showDropdown: true })
  }

  hideDropdownButton = (type) => {
    this.setState({ showDropdown: false })
    this.props.addNappyBM(type)
    this.setState({ nappy: this.props.nappy })
  }

  addNappyToStateAndAPI = () => {
    this.props.addNappy()
    this.setState({ showNappy: true })
  }

  addNappyWet = () => {
    this.props.addNappyWet()
    this.setState({ nappy: this.props.nappy })
  }

  removeNappyWet = () => {
    this.props.removeNappyWet()
    this.setState({ nappy: this.props.nappy })
  }


  removeNappyBM = (type) => {
    this.props.removeNappyBM(type)
    this.setState({ nappy: this.props.nappy })
  }
    

  render () {
    // const nappyURL = require('../images/135028-baby-collection/svg/diaper.svg')
    const nappyURL = require(`../images/${this.props.kid.gender}_potty.jpg`)

    return (
      <Grid centered verticalAlign='top' align className='pottyGrid'>
        <Grid.Row columns={1}>
          <Grid.Column >
            <Image className='elem-icon' onClick={this.addNappyToStateAndAPI} alt='' src={nappyURL} height='100' width='110' />
          </Grid.Column>

          {/* <Grid.Column >
            {this.props.currentUser.childminder &&
            <Button className='square-full' onClick={this.addNappyToStateAndAPI} >
              Add potty
              <br />
              or nappy
            </Button>
            }
          </Grid.Column> */}
        </Grid.Row>

        {this.props.nappy &&
          <>
            <Grid.Row columns={2}>
              <Grid.Column textAlign='center'>

                <Grid centered verticalAlign='top' align>
                  <Grid.Row columns={2}>
                    <Grid.Column textAlign='center'>
                      <p className='nappy-names'>Wet</p>
                      <p className='wet nappy-numbers'>{this.state.nappy && this.state.nappy.wet && this.state.nappy.wet }</p>
                    </Grid.Column>

                    <Grid.Column textAlign='center'>
                      <Button circular icon='add' onClick={this.props.currentUser.childminder && this.props.addNappyWet} />
                      {this.state.nappy && this.state.nappy.wet > 0 &&
                        <Button className='wet minus-buttons' circular icon='minus' onClick={this.props.currentUser.childminder && this.props.removeNappyWet} />
                      }
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <Grid centered verticalAlign='top' align>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <p className='nappy-names'>BM </p>
                    </Grid.Column>

                    <Grid.Column>
                      <Button circular icon='add' onClick={this.props.currentUser.childminder && this.showDropdownButton} />
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
                <Grid centered verticalAlign='top' align className='pottyType'>
                  {this.props.currentUser.childminder &&
                    this.state.showDropdown &&
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Dropdown item text='select type'>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.hideDropdownButton('normal')}>normal</Dropdown.Item>
                            <DropdownItem onClick={() => this.hideDropdownButton('runny')}>runny</DropdownItem>
                            <DropdownItem onClick={() => this.hideDropdownButton('hard')}>hard</DropdownItem>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Grid.Column>
                    </Grid.Row>
                  }

                  {this.state.nappy && this.state.nappy.bm_normal > 0 &&
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <p className='nappy-numbers'> normal {this.state.nappy.bm_normal}</p>

                    </Grid.Column>
                    <Grid.Column>
                      <Button className='minus-buttons' circular icon='minus' onClick={() => this.props.currentUser.childminder && this.props.removeNappyBM('normal')} />
                    </Grid.Column>
                  </Grid.Row>
                  }
                  {this.state.nappy && this.state.nappy.bm_runny > 0 &&
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <p className='nappy-numbers'> runny {this.state.nappy.bm_runny}</p>
                    </Grid.Column>
                    <Grid.Column>
                      <Button className='minus-buttons' circular icon='minus' onClick={() => this.props.currentUser.childminder && this.props.removeNappyBM('runny')} />
                    </Grid.Column>

                  </Grid.Row>
                  }

                  {this.state.nappy && this.state.nappy.bm_hard > 0 &&
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <p className='nappy-numbers'> hard {this.state.nappy.bm_hard}</p>
                    </Grid.Column>

                    <Grid.Column>
                      <Button className='minus-buttons' circular icon='minus' onClick={() => this.props.currentUser.childminder && this.props.removeNappyBM('hard')} />
                    </Grid.Column>
                  </Grid.Row>
                  }
                </Grid>
              </Grid.Column>
            </Grid.Row>

          </>
        }

      </Grid>
    )
  }
}

export default NappyPotty
