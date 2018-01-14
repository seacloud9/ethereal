import React from 'react'
import PropTypes from 'prop-types'

type ControlPadProps = {
    onChange: PropTypes.func,
}

export default class ControlPad extends React.Component {
  props:ControlPadProps

  keyboardGo = (_key, _enabled = true) => {
    try {
      const el = document.getElementById('camera')
      let cm = el.components['wasd-controls']
      cm.keys['Key' + _key] = _enabled
    } catch (e) {
      console.log('keyboardGo:' + e)
    }
  }

  render () {
    return (
      <div id='ControlPad'>
        <div id='ControlPadA' onMouseDown={() => this.keyboardGo('A')} onMouseUp={() => this.keyboardGo('A', false)}>
          <img src='./images/arrow.png' />
        </div>
        <div id='ControlPadW' onMouseDown={() => this.keyboardGo('W')} onMouseUp={() => this.keyboardGo('W', false)}>
          <img src='./images/arrow.png' />
        </div>
        <div id='ControlPadD' onMouseDown={() => this.keyboardGo('D')} onMouseUp={() => this.keyboardGo('D', false)}>
          <img src='./images/arrow.png' />
        </div>
      </div>
    )
  }
}
