import React from 'react'

import BaseComponent from 'utils/BaseComponent'
import request from 'utils/request'

import { DEVELOPERS_URL, DEVELOPER_EXIST_URL } from 'constants.js'

import List from './components/List'
import AddDev from './components/AddDev'
import EditDev from './components/EditDev'

import './styles.css'

const IMAGES = {
  logo: require('./img/logo.png')
}

export default class App extends BaseComponent {

  constructor() {
    super()

    this.state = {
      developers: [],
      form: {
        input: ''
      },
      searchClick: '',
      devEdited: null
    }

    this._bind('_handleSearchChange', '_handleSubmit', '_fetchData', '_handleEdit')
  }

  componentDidMount() {
    request(DEVELOPER_EXIST_URL)
      .then(res=> {
        !res.exists && request(DEVELOPERS_URL(), {
          method: 'POST',
          body: {
            name: 'Jonatan Santa Cruz',
            company: 'Cross Bridge',
            experience: 3
          }
         })
        this._fetchData()
      })
  }

  _fetchData() {
    request(DEVELOPERS_URL())
      .then(developers => {
        this.setState({
          developers,
          developerMatches: developers.length
        })
      })
  }

  _handleSubmit(e) {
    e.preventDefault()
    this.setState({ searchClick: this.state.form.input })
  }


  _handleSearchChange(e) {
    this.setState({
      form: {
        [e.target.name]: e.target.value
      },
      searchClick: !!e.target.value.length ? this.state.searchClick : ''
    })
  }

  _handleEdit(id) { this.setState({ devEdited: id }) }

  render() {
    const form = this.state.form
    return (
      <div className="App">
        <nav>
          <img src={IMAGES.logo} alt="Logo" />
          <form className="SearchForm" onSubmit={this._handleSubmit} >
            <input  type="text"
                    placeholder="Search"
                    name="input"
                    value={form.input}
                    onChange={this._handleSearchChange} />
            <button disabled={!form.input.length} type="submit">Search</button>
          </form>
        </nav>
        <div className="Container">
          <List developers={this.state.developers}
                searchClick={this.state.searchClick}
                refreshData={this._fetchData}
                handleEdit={this._handleEdit} />
          <div>
            <AddDev refreshData={this._fetchData} />
            {!!this.state.devEdited && <EditDev refreshData={this._fetchData} handleEdit={this._handleEdit} id={this.state.devEdited}/> }
          </div>
        </div>
      </div>
    )
  }
}
