import React from 'react'
import PropTypes from 'prop-types'
import {Entity} from 'aframe-react'
import '../aframeComponents/uiBanner'

type UiEnemeyEncounterProps = {
    onChange: PropTypes.func.isRequired,
    current_scene: PropTypes.number,
    gradientArray: PropTypes.array,
    onEnvLoad: PropTypes.func,
    camera: PropTypes.any,
}

export default class UiEnemeyEncounter extends React.Component {
  props:UiEnemeyEncounterProps

  componentDidMount () {
      document.querySelector('#camera').components["gamepad-controls"].data.movementEnabled = false
      document.querySelector('#camera').components["wasd-controls"].data.enabled = false
      document.querySelector('#camera').setAttribute('position', { x: 0.5537604935079524, y: 1.6, z: -0.7602567708061172 })
      document.querySelector('#camera').setAttribute('rotation', { x: -0.054000000000000124, y: 1.6, z: -0.008000000000001263 })
  }

  render () {
    const scaleAni = {property: 'scale', dir: 'normal', dur: 1000, loop: false, from: '0.1 0.1 0.1', to: '1 1 1', fill: 'both'}
    const scaleDefault = '0.1 0.1 0.11'
   
    return (
      <Entity position='0 -1.5 1'>
        <Entity ref='uiOverlayCanvas' id='uiOverlayCanvas' width='1.4' height='0.34' primitive='a-plane' position='-0.25 2.04 -2' scale={scaleDefault} animation__scale={scaleAni} uibanner='id:uiOverlayFightScene' material='shader: flat; src: #uiOverlayFightScene' />
        <Entity ref='uiFightSceneIcons' primitive='a-plane' width='1' height='0.2' position='-0.25 2.18 -1.8' material='shader: flat; alphaTest:0.2; transparent:true; src: #fightSceneIcons' scale={scaleDefault} animation__scale={scaleAni} />
        <Entity position='-0.18 2.18 -1.6' text={{value: 'FIGHT      SPELL  ITEM    ESCAPE', width: 1, height: 1, wrapCount: 30, font: '/js/zorque.fnt'}} scale={scaleDefault} animation__scale={scaleAni} />
      </Entity>
    )
  }
}
