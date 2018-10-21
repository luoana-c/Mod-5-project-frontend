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
      <Grid centered align verticalAlign='top' className='nappyGrid'>
        <Grid.Row columns={2}>
          <Grid.Column >
            <Image className='elem-icon' alt='' src={nappyURL} height='50' width='50' />
          </Grid.Column>

          <Grid.Column >
            {this.props.currentUser.childminder &&
            <Button circular onClick={this.addNappyToStateAndAPI} >
              Add nappy
              <br />
              potty
            </Button>
            }
          </Grid.Column>
        </Grid.Row>

        {this.props.nappy &&
          <>
            <Grid.Row className='nappy-info' columns={4} centered align>
              <Grid.Column>
                <p>Wet </p>
              </Grid.Column>

              <Grid.Column>
                {this.props.currentUser.childminder &&
                <Button circular icon='add' onClick={this.props.addNappyWet} />
                }
              </Grid.Column>

              <Grid.Column>
                <p>BM </p>
                {this.props.currentUser.childminder &&
                this.state.showDropdown &&
                  <Dropdown item text='select type'>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => this.hideDropdownButton('normal')}>normal</Dropdown.Item>
                      <DropdownItem onClick={() => this.hideDropdownButton('runny')}>runny</DropdownItem>
                      <DropdownItem onClick={() => this.hideDropdownButton('hard')}>hard</DropdownItem>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              </Grid.Column>

              <Grid.Column>
                {this.props.currentUser.childminder &&
                <Button circular icon='add' onClick={this.showDropdownButton} />
                }
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='nappy-info' columns={4} centered align>
              <Grid.Column>
                <p>{this.props.nappy.wet && this.props.nappy.wet }</p>
              </Grid.Column>

              <Grid.Column>
                {this.props.currentUser.childminder &&
                <Button circular icon='minus' onClick={this.props.removeNappyWet} />
                }
              </Grid.Column>

              <Grid.Column>
                {this.props.nappy.bm_normal > 0 &&
                <p> normal: {this.props.nappy.bm_normal}</p>
                }
              </Grid.Column>

              <Grid.Column>
                {this.props.nappy.bm_normal > 0 &&
                  this.props.currentUser.childminder &&
                  <Button circular icon='minus' onClick={() => this.props.removeNappyBM('normal')} />
                }
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='nappy-info' columns={4} centered align>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
                {this.props.nappy.bm_runny > 0 &&
                <p> runny: {this.props.nappy.bm_runny}</p>
                }
              </Grid.Column>
              <Grid.Column>
                {this.props.nappy.bm_runny > 0 &&
                    this.props.currentUser.childminder &&
                    <Button circular icon='minus' onClick={() => this.props.removeNappyBM('runny')} />
                }
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='nappy-info' columns={4} centered align>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
                {this.props.nappy.bm_hard > 0 &&
                <p> hard: {this.props.nappy.bm_hard}</p>
                }

              </Grid.Column>
              <Grid.Column>
                {this.props.nappy.bm_hard > 0 &&
                    this.props.currentUser.childminder &&
                    <Button circular icon='minus' onClick={() => this.props.removeNappyBM('hard')} />
                }
              </Grid.Column>
            </Grid.Row>
        </>
        }

      </Grid>
    )
  }
}

export default NappyPotty
