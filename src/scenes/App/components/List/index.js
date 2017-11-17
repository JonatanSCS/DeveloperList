import React from 'react'

import Developer from './Developer'

import './styles.css'

export default function List (props) {

  const _renderDevelopers = developer => {
    let searchFilter = props.searchClick
    let isMatch = !!developer.name.match(searchFilter) ||
                  !!developer.company.match(searchFilter)

    return isMatch ? (
      <Developer  key={developer.id}
                  developer={developer}
                  refreshData={props.refreshData}
                  handleEdit={props.handleEdit} />
    ) : null
  }

  return (
    <div className="Table">
      <h1>Developer List</h1>
      <div className="List">
        <div className="DeveloperHeader">
          <p>Name</p>
          <p>Company</p>
          <p>Experience</p>
          <p>Delete</p>
          <p>Edit</p>
        </div>
        {props.developers.map(_renderDevelopers)}
      </div>
    </div>
  )
}
