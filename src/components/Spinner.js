import React, { Component } from 'react'
import loading from './giphy .gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-6">
        <img src={loading} alt="" height="200px" width="200px"/>
      </div>
    )
  }
}
