import React from 'react'
import Validator from 'validatorjs'

import BaseComponent from 'utils/BaseComponent'

import Form from 'components/Form'

import request from 'utils/request'

import { DEVELOPERS_URL } from 'constants.js'


export default class AddDev extends BaseComponent {

  constructor() {
    super()

    this.state = {
      buttonProps: {
        disabled: true
      },
      formData: {
        name: '',
        company: '',
        experience: 0
      }
    }

    this._bind('_handleInputChange', '_validate', '_handleSubmit')
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

    this._validate()
  }

  _validate() {
    const validator = new Validator(
      this.state.formData,
      AddDev.validationRules
    )

    this.setState({
      buttonProps: {
        disabled: !validator.passes()
      }
    })
  }

  _handleSubmit(e) {
    e.preventDefault()
    request(DEVELOPERS_URL(), {
      method: 'POST',
      body: { ...this.state.formData }
     })
      .then(res => {
        this.props.refreshData()
        this.setState({
          formData: {
            name: '',
            company: '',
            experience: 0
          },
          buttonProps: {
            disabled: true
          }
        })
      })
  }

  render() {
    return (
      <Form formData={this.state.formData}
            onChange={this._handleInputChange}
            onSubmit={this._handleSubmit}
            buttonProps={this.state.buttonProps}
            title="Add a new Developer" />
    )
  }
}

AddDev.validationRules = {
  name: 'string|required',
  company: 'string|required',
  number: 'numeric',
}
