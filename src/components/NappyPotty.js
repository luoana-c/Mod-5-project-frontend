import React from 'react'
import { Button, Image, Dropdown, DropdownItem } from 'semantic-ui-react'

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
      <div>

        <Image alt='' src={nappyURL} height='50' width='50' />
        {this.props.currentUser.childminder &&
          <Button circular onClick={this.addNappyToStateAndAPI} >
            {/* <Icon name='add' /> */}
              Add nappy/potty
          </Button>
        }

        {this.props.nappy &&
        <div>
          <p>Wet: {this.props.nappy.wet && this.props.nappy.wet }</p>
          {this.props.currentUser.childminder &&
            <Button circular icon='add' onClick={this.props.addNappyWet} />
          }
          {this.props.currentUser.childminder &&
            <Button circular icon='minus' onClick={this.props.removeNappyWet} />
          }
          <p>BM: </p>
          {this.props.currentUser.childminder &&
            <Button circular icon='add' onClick={this.showDropdownButton} />
          }
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

          {this.props.nappy.bm_normal > 0 &&
          <div>
            <p> normal: {this.props.nappy.bm_normal}</p>
            {this.props.currentUser.childminder &&
              <Button circular icon='minus' onClick={() => this.props.removeNappyBM('normal')} />
            }
          </div>
          }

          {this.props.nappy.bm_runny > 0 &&
          <div>
            <p> runny: {this.props.nappy.bm_runny}</p>
            {this.props.currentUser.childminder &&
              <Button circular icon='minus' onClick={() => this.props.removeNappyBM('runny')} />
            }
          </div>
          }

          {this.props.nappy.bm_hard > 0 &&
          <div>
            <p> hard: {this.props.nappy.bm_hard}</p>
            {this.props.currentUser.childminder &&
              <Button circular icon='minus' onClick={() => this.props.removeNappyBM('hard')} />
            }
          </div>
          }

        </div>
        }
      </div>
    )
  }
}

export default NappyPotty
