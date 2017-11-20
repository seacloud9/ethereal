import React from 'react'
import PropTypes from 'prop-types'
import {Entity} from 'aframe-react'
import '../aframeComponents/uiBanner'

type UiOverlayProps = {
    onChange: PropTypes.func.isRequired,
    current_scene: PropTypes.number,
    gradientArray: PropTypes.array,
    onEnvLoad: PropTypes.func
}

export default class UiOverlay extends React.Component {
  props:UiOverlayProps

  componentDidMount () {
    console.log(this.refs.uiOverlayCanvas)
  }

  render () {
    return (
      <Entity ref='uiOverlayCanvas' id='uiOverlayCanvas' width='3' height='1' primitive='a-plane' scale='1 1 1' position='-0.2 2 -2' animation__opacity={{property: 'opacity', dir: 'normal', dur: 1000, loop: false, from: 0, to: 1, fill: 'both' }} draw='width: 512; height: 512' uibanner='' />
    )
  }
}
