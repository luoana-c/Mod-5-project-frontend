import React from 'react'
import { Button, Image, Dropdown, DropdownItem, Grid } from 'semantic-ui-react'
import './NappyPotty.css'

class NappyPotty extends React.Component {
  state = {
    showDropdown: false,
    showNappy: false
  }

  // componentDidUpdate (prevProps) {
  //   // console.log('did update called')
  //   if (prevProps.nappy.id !== this.props.nappy.id && this.props.nappy.id) {
  //     this.getNaps()
  //   }
  // }

  showDropdownButton = () => {
    this.setState({ showDropdown: true })
  }

  hideDropdownButton = (type) => {
    this.setState({ showDropdown: false })
    this.props.addNappyBM(type)
  }

  addNappyToStateAndAPI = () => {
    this.props.addNappy()
    this.setState({ showNappy: true })
  }

  render () {
    const nappyURL = require('../images/135028-baby-collection/svg/diaper.svg')

    return (
      <Grid centered verticalAlign='top' align className='pottyGrid'>
        <Grid.Row columns={2}>
          <Grid.Column >
            <Image className='elem-icon' alt='' src={nappyURL} height='50' width='50' />
          </Grid.Column>

          <Grid.Column >
            {this.props.currentUser.childminder &&
            <Button className='square-full' onClick={this.addNappyToStateAndAPI} >
              Add potty
              <br />
              or nappy
            </Button>
            }
          </Grid.Column>
        </Grid.Row>

        {this.props.nappy &&
          <>
            <Grid.Row columns={2}>
              <Grid.Column textAlign='center'>

                <Grid centered verticalAlign='top' align>
                  <Grid.Row columns={2}>
                    <Grid.Column textAlign='center'>
                      <p className='nappy-names'>Wet</p>
                      <p className='wet nappy-numbers'>{this.props.nappy.wet && this.props.nappy.wet }</p>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                      {this.props.currentUser.childminder &&
                      <Button circular icon='add' onClick={this.props.addNappyWet} />
                      }
                      {this.props.currentUser.childminder &&
                      <Button className='wet minus-buttons' circular icon='minus' onClick={this.props.removeNappyWet} />
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
                      {this.props.currentUser.childminder &&
                      <Button circular icon='add' onClick={this.showDropdownButton} />
                      }
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

                  {this.props.nappy.bm_normal > 0 &&
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <p className='nappy-numbers'> normal {this.props.nappy.bm_normal}</p>

                    </Grid.Column>
                    <Grid.Column>
                      {this.props.currentUser.childminder &&
                        <Button className='minus-buttons' circular icon='minus' onClick={() => this.props.removeNappyBM('normal')} />
                      }

                    </Grid.Column>
                  </Grid.Row>
                  }
                  {this.props.nappy.bm_runny > 0 &&
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <p className='nappy-numbers'> runny {this.props.nappy.bm_runny}</p>
                    </Grid.Column>
                    <Grid.Column>
                      {this.props.currentUser.childminder &&
                        <Button className='minus-buttons' circular icon='minus' onClick={() => this.props.removeNappyBM('runny')} />
                      }

                    </Grid.Column>
                  </Grid.Row>
                  }
                  {this.props.nappy.bm_hard > 0 &&
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <p className='nappy-numbers'> hard {this.props.nappy.bm_hard}</p>

                    </Grid.Column>
                    <Grid.Column>
                      {this.props.currentUser.childminder &&
                        <Button className='minus-buttons' circular icon='minus' onClick={() => this.props.removeNappyBM('hard')} />
                      }

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
