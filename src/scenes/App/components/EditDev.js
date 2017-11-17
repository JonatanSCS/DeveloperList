import React from 'react'
import Validator from 'validatorjs'

import BaseComponent from 'utils/BaseComponent'

import Form from 'components/Form'

import request from 'utils/request'

import { DEVELOPERS_URL } from 'constants.js'


export default class EditDev extends BaseComponent {

  constructor() {
    super()

    this.state = {
      buttonProps: {
        disabled: false
      },
      formData: {
        name: '',
        company: '',
        experience: 0
      }
    }

    this._bind('_handleInputChange', '_validate', '_handleSubmit', '_closeEdit', '_updateEdit')
  }

  componentDidMount() {
    this._updateEdit(this.props.id)
  }

  componentWillReceiveProps(nexProps) {
    this._updateEdit(nexProps.id)
  }

  _updateEdit(id) {
    request(DEVELOPERS_URL(id))
      .then(developer => {
        this.setState({
          formData: {
            name: developer.name,
            company: developer.company,
            experience: developer.experience
          }
        })
      })
  }


  _handleInputChange(e) {
    const target = {
      name: e.target.name,
      value: e.target.value
    }

    this.setState({
      formData: {
        ...this.state.formData,
        [target.name]: target.value
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.formData !== nextState.formData)
      this._validate(nextState.formData)
  }

  _validate(formData) {
    const validator = new Validator(
      formData,
      EditDev.validationRules
    )
    this.setState({
      buttonProps: {
        disabled: !validator.passes()
      }
    })
  }

  _handleSubmit(e) {
    e.preventDefault()
    request(DEVELOPERS_URL(this.props.id), {
      method: 'PUT',
      body: { ...this.state.formData }
     })
      .then(res => {
        this.props.refreshData()
        this.props.handleEdit(null)
      })
  }

  _closeEdit() {
    this.props.handleEdit(null)
  }

  render() {
    return (
      <Form formData={this.state.formData}
            onChange={this._handleInputChange}
            onSubmit={this._handleSubmit}
            buttonProps={this.state.buttonProps}
            title="Edit Developer">
            <button className="cancel" type='submit' onClick={this._closeEdit}>Cancel</button>
      </Form>
    )
  }
}

EditDev.validationRules = {
  name: 'string|required',
  company: 'string|required',
  number: 'numeric',
}
