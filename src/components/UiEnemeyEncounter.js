import React from 'react'
import PropTypes from 'prop-types'
import {Entity} from 'aframe-react'
import '../aframeComponents/uiBanner'

type UiEnemeyEncounterProps = {
    onChange: PropTypes.func.isRequired,
    current_scene: PropTypes.number,
    gradientArray: PropTypes.array,
    onEnvLoad: PropTypes.func
}

export default class UiEnemeyEncounter extends React.Component {
  props:UiEnemeyEncounterProps

  componentDidMount () {
    console.log(this.refs.uiOverlayCanvas)
  }

  render () {
    const scaleAni = {property: 'scale', dir: 'normal', dur: 1000, loop: false, from: '0.1 0.1 0.1', to: '1 1 1', fill: 'both'}
    const scaleDefault = '0.1 0.1 0.11'
    return (
      <Entity>
        <Entity ref='uiOverlayCanvas' id='uiOverlayCanvas' width='2.2' height='1' primitive='a-plane' position='-0.1 2 -2' scale={scaleDefault} animation__scale={scaleAni} uibanner='id:uiOverlayFightScene' material='shader: flat; src: #uiOverlayFightScene' />
        <Entity position='-0.5 2 -1.8' text={{value: 'FIGHT \n RUN', width: 1, wrapCount: 6, font: '/js/zorque.fnt'}} scale={scaleDefault} animation__scale={scaleAni} />
        <Entity position='0.5 2 -1.8' text={{value: 'SPELL \n ITEM', width: 1, wrapCount: 6, font: '/js/zorque.fnt'}} scale={scaleDefault} animation__scale={scaleAni} />
      </Entity>
    )
  }
}
