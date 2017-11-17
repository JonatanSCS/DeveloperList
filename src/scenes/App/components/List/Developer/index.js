import React from 'react'

import request from 'utils/request'

import { DEVELOPERS_URL } from 'constants.js'

import './styles.css'

export default function Developer(props) {

  const _handleDelete = (e) => {
    e.preventDefault()
    request(DEVELOPERS_URL(props.developer.id), {
      method: 'DELETE' })
      .then(res => {
        props.refreshData()
      })
  }

  const _handleEdit = (e) => {
    e.preventDefault()
    props.handleEdit(props.developer.id)
  }

  const developer = props.developer
  return (
    <div className="Developer">
      <p>{developer.name}</p>
      <p>{developer.company}</p>
      <p>{developer.experience}</p>
      <p><button onClick={_handleDelete}>Delete</button></p>
      <p><button className="Edit" onClick={_handleEdit}>Edit</button></p>
    </div>
  )
}
