import React from 'react'
import { Image, Dropdown, Menu } from 'semantic-ui-react'


class Kid extends React.Component {
    state = {

    }
    // 
    // 

    

    render = () => {
      const fileName = this.props.kid.gender
      const imageUrl = require(`../images/${fileName}.svg`)
      return (
        <div>
          {/* <Menu vertical>
            <Dropdown item icon='bars' simple>
              <Dropdown.Menu>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Parents</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu> */}
          <Image
            alt=''
            src={imageUrl}
            height='50'
            width='50'
            />
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{this.props.kid.first_name} {this.props.kid.last_name}</span>
          <p>Age: {this.props.kid.age_years} year(s) {this.props.kid.age_months} month(s)</p>

        </div>
      )
    }
}

export default Kid