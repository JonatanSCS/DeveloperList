import React from 'react'

import './styles.css'

export default function Form (props){
  const formData = props.formData
  return (
    <div className="FormDev">
      <form onSubmit={props.onSubmit}>
        <h2>{props.title}</h2>
        <input  type='text'
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={props.onChange} />
        <input  type='text'
                placeholder="Company"
                name="company"
                value={formData.company}
                onChange={props.onChange} />
        <input  type='number'
                min='0'
                placeholder="Experience (Years)"
                name="experience"
                value={formData.experience}
                onChange={props.onChange} />
              <div className="Controls">
          {props.children}
          <button type='submit' {...props.buttonProps}>Send</button>
        </div>
      </form>
    </div>
  )
}
