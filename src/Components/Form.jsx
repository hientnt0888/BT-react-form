import React, { Component } from 'react'
import InputForm from './Input-form'
import ListForm from './List-form'

export default class Form extends Component {
  render() {
    return (
      <div className='container'>
        <InputForm/>
        <ListForm/>
      </div>
    )
  }
}
