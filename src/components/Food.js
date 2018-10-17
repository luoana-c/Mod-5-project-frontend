import React from 'react'
import { Image, Button, Checkbox, Form } from 'semantic-ui-react'
import moment from 'moment'

class Food extends React.Component {
  state= {
    breakfast: (!!this.props.food.breakfast_had),
    am_snack: (!!this.props.food.am_snack_had),
    lunch: (!!this.props.food.lunch_had),
    pm_snack: (!!this.props.food.pm_snack_had),
    dinner_tea: (!!this.props.food.dinner_tea_had),
    breakfastValue: this.props.food.breakfast_had,
    amSnackValue: this.props.food.am_snack_had,
    lunchValue: this.props.food.lunch_had,
    pmSnackValue: this.props.food.pm_snack_had,
    dinnerTeaValue: this.props.food.dinner_tea_had
  }

  addBreakfastOptions = () => {
    if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
      this.setState({ breakfast: true })
    }
  }

  handleChangeBreakfast = (e, { value }) => {
    if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
      this.setState({ breakfastValue: value })
      this.props.addFoodHad(value, 'breakfast')
    }
  }

  addAMSnackOptions = () => {
    if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
      this.setState({ am_snack: true })
    }
  }

  handleChangeAMSnack = (e, { value }) => {
    if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
      this.setState({ amSnackValue: value })
      this.props.addFoodHad(value, 'am_snack')
    }
  }

  addLunchOptions = () => {
    if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
      this.setState({ lunch: true })
    }
  }

  handleChangeLunch = (e, { value }) => {
    if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
      this.setState({ lunchValue: value })
      this.props.addFoodHad(value, 'lunch')
    }
  }

  addPMSnackOptions = () => {
    if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
      this.setState({ pm_snack: true })
    }
  }

  handleChangePMSnack = (e, { value }) => {
    if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
      this.setState({ pmSnackValue: value })
      this.props.addFoodHad(value, 'pm_snack')
    }
  }

  addDinnerTeaOptions = () => {
    if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
      this.setState({ dinner_tea: true })
    }
  }

  handleChangeDinnerTea = (e, { value }) => {
    if (moment(this.props.day.date).format('YYYY-MM-DD') === moment().startOf('day').format('YYYY-MM-DD')) {
      this.setState({ dinnerTeaValue: value })
      this.props.addFoodHad(value, 'dinner_tea')
    }
  }

  render () {
    return (
      <div>
        
        {this.props.food &&
        <div>
          <Button onClick={this.addBreakfastOptions}>Breakfast:</Button>
          {this.state.breakfast &&
            <Form>
              {/* <Form.Field>
                    Selected value: <b>{this.state.breakfastValue}</b>
                </Form.Field> */}
              <Form.Field>
                <Checkbox
                  radio
                  label='None'
                  name='checkboxRadioGroup'
                  value='None'
                  checked={this.state.breakfastValue === 'None'}
                  onChange={this.handleChangeBreakfast}

                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Some'
                  name='checkboxRadioGroup'
                  value='Some'
                  checked={this.state.breakfastValue === 'Some'}
                  onChange={this.handleChangeBreakfast}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='All'
                  name='checkboxRadioGroup'
                  value='All'
                  checked={this.state.breakfastValue === 'All'}
                  onChange={this.handleChangeBreakfast}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Extra'
                  name='checkboxRadioGroup'
                  value='Extra'
                  checked={this.state.breakfastValue === 'Extra'}
                  onChange={this.handleChangeBreakfast}
                />
              </Form.Field>
            </Form>
          }
          <Button onClick={this.addAMSnackOptions}>AM Snack:</Button>
          {this.state.am_snack &&
            <Form>
              {/* <Form.Field>
                    Selected value: <b>{this.state.breakfastValue}</b>
                </Form.Field> */}
              <Form.Field>
                <Checkbox
                  radio
                  label='None'
                  name='checkboxRadioGroup'
                  value='None'
                  checked={this.state.amSnackValue === 'None'}
                  onChange={this.handleChangeAMSnack}

                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Some'
                  name='checkboxRadioGroup'
                  value='Some'
                  checked={this.state.amSnackValue === 'Some'}
                  onChange={this.handleChangeAMSnack}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='All'
                  name='checkboxRadioGroup'
                  value='All'
                  checked={this.state.amSnackValue === 'All'}
                  onChange={this.handleChangeAMSnack}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Extra'
                  name='checkboxRadioGroup'
                  value='Extra'
                  checked={this.state.amSnackValue === 'Extra'}
                  onChange={this.handleChangeAMSnack}
                />
              </Form.Field>
            </Form>
          }
          <Button onClick={this.addLunchOptions}>Lunch:</Button>
          {this.state.lunch &&
            <Form>
              {/* <Form.Field>
                    Selected value: <b>{this.state.breakfastValue}</b>
                </Form.Field> */}
              <Form.Field>
                <Checkbox
                  radio
                  label='None'
                  name='checkboxRadioGroup'
                  value='None'
                  checked={this.state.lunchValue === 'None'}
                  onChange={this.handleChangeLunch}

                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Some'
                  name='checkboxRadioGroup'
                  value='Some'
                  checked={this.state.lunchValue === 'Some'}
                  onChange={this.handleChangeLunch}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='All'
                  name='checkboxRadioGroup'
                  value='All'
                  checked={this.state.lunchValue === 'All'}
                  onChange={this.handleChangeLunch}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Extra'
                  name='checkboxRadioGroup'
                  value='Extra'
                  checked={this.state.lunchValue === 'Extra'}
                  onChange={this.handleChangeLunch}
                />
              </Form.Field>
            </Form>
          }
          <Button onClick={this.addPMSnackOptions}>PM Snack:</Button>
          {this.state.pm_snack &&
            <Form>
              {/* <Form.Field>
                    Selected value: <b>{this.state.breakfastValue}</b>
                </Form.Field> */}
              <Form.Field>
                <Checkbox
                  radio
                  label='None'
                  name='checkboxRadioGroup'
                  value='None'
                  checked={this.state.pmSnackValue === 'None'}
                  onChange={this.handleChangePMSnack}

                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Some'
                  name='checkboxRadioGroup'
                  value='Some'
                  checked={this.state.pmSnackValue === 'Some'}
                  onChange={this.handleChangePMSnack}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='All'
                  name='checkboxRadioGroup'
                  value='All'
                  checked={this.state.pmSnackValue === 'All'}
                  onChange={this.handleChangePMSnack}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Extra'
                  name='checkboxRadioGroup'
                  value='Extra'
                  checked={this.state.pmSnackValue === 'Extra'}
                  onChange={this.handleChangePMSnack}
                />
              </Form.Field>
            </Form>
          }
          <Button onClick={this.addDinnerTeaOptions}>Dinner/Tea:</Button>
          {this.state.dinner_tea &&
            <Form>
              {/* <Form.Field>
                    Selected value: <b>{this.state.breakfastValue}</b>
                </Form.Field> */}
              <Form.Field>
                <Checkbox
                  radio
                  label='None'
                  name='checkboxRadioGroup'
                  value='None'
                  checked={this.state.dinnerTeaValue === 'None'}
                  onChange={this.handleChangeDinnerTea}

                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Some'
                  name='checkboxRadioGroup'
                  value='Some'
                  checked={this.state.dinnerTeaValue === 'Some'}
                  onChange={this.handleChangeDinnerTea}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='All'
                  name='checkboxRadioGroup'
                  value='All'
                  checked={this.state.dinnerTeaValue === 'All'}
                  onChange={this.handleChangeDinnerTea}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Extra'
                  name='checkboxRadioGroup'
                  value='Extra'
                  checked={this.state.dinnerTeaValue === 'Extra'}
                  onChange={this.handleChangeDinnerTea}
                />
              </Form.Field>
            </Form>
          }
        </div>
        }
      </div>
    )
  }
}

export default Food
