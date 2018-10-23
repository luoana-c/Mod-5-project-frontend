import React from 'react'
import { Button, Checkbox, Form, Grid } from 'semantic-ui-react'
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

  componentDidUpdate (prevProps) {
    // console.log('did update called')
    if (prevProps.day.id !== this.props.day.id && this.props.day.id) {
      this.refreshStateMethod()
    }
  }

  refreshStateMethod = () => {
    this.setState({
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
    })
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
      <Grid centered verticalAlign='top' align className='pottyGrid'>

        {this.props.food &&
          <>        
            <Grid.Row columns={1}>
              <Grid.Column >
                <Button className='m-snack-button' onClick={this.props.currentUser.childminder && this.addBreakfastOptions}>Breakfast:</Button>
              </Grid.Column>
            </Grid.Row>

            {this.state.breakfast &&
            <Grid.Row columns={4}>
              <Form className='foodForm'>
                {/* <Form.Field>
                    Selected value: <b>{this.state.breakfastValue}</b>
                </Form.Field> */}

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='None'
                      name='checkboxRadioGroup'
                      value='None'
                      checked={this.state.breakfastValue === 'None'}
                      onChange={this.props.currentUser.childminder && this.handleChangeBreakfast}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Some'
                      name='checkboxRadioGroup'
                      value='Some'
                      checked={this.state.breakfastValue === 'Some'}
                      onChange={this.props.currentUser.childminder && this.handleChangeBreakfast}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='All'
                      name='checkboxRadioGroup'
                      value='All'
                      checked={this.state.breakfastValue === 'All'}
                      onChange={this.props.currentUser.childminder && this.handleChangeBreakfast}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Extra'
                      name='checkboxRadioGroup'
                      value='Extra'
                      checked={this.state.breakfastValue === 'Extra'}
                      onChange={this.props.currentUser.childminder && this.handleChangeBreakfast}
                    />
                  </Form.Field>
                </Grid.Column>

              </Form>
            </Grid.Row>
            }
            <Grid.Row columns={1}>
              <Grid.Column >
                <Button className='m-snack-button' onClick={this.props.currentUser.childminder && this.addAMSnackOptions}>AM Snack:</Button>
              </Grid.Column>
            </Grid.Row>

            {this.state.am_snack &&
            <Grid.Row columns={4}>
              <Form className='foodForm'>
                {/* <Form.Field>
                    Selected value: <b>{this.state.breakfastValue}</b>
                </Form.Field> */}
                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='None'
                      name='checkboxRadioGroup'
                      value='None'
                      checked={this.state.amSnackValue === 'None'}
                      onChange={this.props.currentUser.childminder && this.handleChangeAMSnack}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Some'
                      name='checkboxRadioGroup'
                      value='Some'
                      checked={this.state.amSnackValue === 'Some'}
                      onChange={this.props.currentUser.childminder && this.handleChangeAMSnack}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='All'
                      name='checkboxRadioGroup'
                      value='All'
                      checked={this.state.amSnackValue === 'All'}
                      onChange={this.props.currentUser.childminder && this.handleChangeAMSnack}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Extra'
                      name='checkboxRadioGroup'
                      value='Extra'
                      checked={this.state.amSnackValue === 'Extra'}
                      onChange={this.props.currentUser.childminder && this.handleChangeAMSnack}
                    />
                  </Form.Field>
                </Grid.Column>
              </Form>
            </Grid.Row>
            }
            <Grid.Row columns={1}>
              <Grid.Column >
                <Button className='lunch-button' onClick={this.props.currentUser.childminder && this.addLunchOptions}>  Lunch:  </Button>
              </Grid.Column>
            </Grid.Row>

            {this.state.lunch &&
            <Grid.Row columns={4}>
              <Form className='foodForm'>
                {/* <Form.Field>
                    Selected value: <b>{this.state.breakfastValue}</b>
                </Form.Field> */}

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='None'
                      name='checkboxRadioGroup'
                      value='None'
                      checked={this.state.lunchValue === 'None'}
                      onChange={this.props.currentUser.childminder && this.handleChangeLunch}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Some'
                      name='checkboxRadioGroup'
                      value='Some'
                      checked={this.state.lunchValue === 'Some'}
                      onChange={this.props.currentUser.childminder && this.handleChangeLunch}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='All'
                      name='checkboxRadioGroup'
                      value='All'
                      checked={this.state.lunchValue === 'All'}
                      onChange={this.props.currentUser.childminder && this.handleChangeLunch}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Extra'
                      name='checkboxRadioGroup'
                      value='Extra'
                      checked={this.state.lunchValue === 'Extra'}
                      onChange={this.props.currentUser.childminder && this.handleChangeLunch}
                    />
                  </Form.Field>
                </Grid.Column>

              </Form>
            </Grid.Row>
            }
            <Grid.Row columns={1}>
              <Grid.Column >
                <Button className='m-snack-button' onClick={this.props.currentUser.childminder && this.addPMSnackOptions}>PM Snack:</Button>
              </Grid.Column>
            </Grid.Row>

            {this.state.pm_snack &&
            <Grid.Row columns={4}>
              <Form className='foodForm'>
                {/* <Form.Field>
                    Selected value: <b>{this.state.breakfastValue}</b>
                </Form.Field> */}

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='None'
                      name='checkboxRadioGroup'
                      value='None'
                      checked={this.state.pmSnackValue === 'None'}
                      onChange={this.props.currentUser.childminder && this.handleChangePMSnack}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Some'
                      name='checkboxRadioGroup'
                      value='Some'
                      checked={this.state.pmSnackValue === 'Some'}
                      onChange={this.props.currentUser.childminder && this.handleChangePMSnack}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='All'
                      name='checkboxRadioGroup'
                      value='All'
                      checked={this.state.pmSnackValue === 'All'}
                      onChange={this.props.currentUser.childminder && this.handleChangePMSnack}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Extra'
                      name='checkboxRadioGroup'
                      value='Extra'
                      checked={this.state.pmSnackValue === 'Extra'}
                      onChange={this.props.currentUser.childminder && this.handleChangePMSnack}
                    />
                  </Form.Field>
                </Grid.Column>

              </Form>
            </Grid.Row>
            }
            <Grid.Row columns={1}>
              <Grid.Column >
                <Button onClick={this.props.currentUser.childminder && this.addDinnerTeaOptions}>Dinner/Tea:</Button>
              </Grid.Column>
            </Grid.Row>

            {this.state.dinner_tea &&
            <Grid.Row columns={4}>
              <Form className='foodForm'>
                {/* <Form.Field>
                    Selected value: <b>{this.state.breakfastValue}</b>
                </Form.Field> */}

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='None'
                      name='checkboxRadioGroup'
                      value='None'
                      checked={this.state.dinnerTeaValue === 'None'}
                      onChange={this.props.currentUser.childminder && this.handleChangeDinnerTea}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Some'
                      name='checkboxRadioGroup'
                      value='Some'
                      checked={this.state.dinnerTeaValue === 'Some'}
                      onChange={this.props.currentUser.childminder && this.handleChangeDinnerTea}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='All'
                      name='checkboxRadioGroup'
                      value='All'
                      checked={this.state.dinnerTeaValue === 'All'}
                      onChange={this.props.currentUser.childminder && this.handleChangeDinnerTea}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column >
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Extra'
                      name='checkboxRadioGroup'
                      value='Extra'
                      checked={this.state.dinnerTeaValue === 'Extra'}
                      onChange={this.props.currentUser.childminder && this.handleChangeDinnerTea}
                    />
                  </Form.Field>
                </Grid.Column>

              </Form>
            </Grid.Row>
            }
          </>
        }
      </Grid>
    )
  }
}

export default Food
