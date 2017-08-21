/**
 * Created by brsmith on 7/3/17.
 */
import 'aframe'
import 'aframe-animation-component'
import 'aframe-text-geometry-component'
import 'aframe-particle-system-component'
import 'aframe-maze-component'
import '@ekolabs/aframe-spritesheet-component'
import 'aframe-environment-component'
import 'babel-polyfill'
import {Entity} from 'aframe-react'
import React from 'react'
import PropTypes from 'prop-types'

type SceneManagerProps = {
    onChange: PropTypes.func.isRequired,
    current_scene: PropTypes.number
}

export default class SceneManager extends React.Component {
  props: SceneManagerProps
  constructor (props) {
    super(props)
    this.state = {current_scene: this.props.current_scene,
      color: 'red',
      scene_array: [
        this.fightScene.bind(this),
        this.mazeScene.bind(this)
      ]}
      var extras =  require('aframe-extras')
      AFRAME.registerComponent('a-ocean', extras.primitives['a-ocean'])
  }

  spriteAnimation () {
    var _animation = { progress: 0 }
    var tween = new window.TWEEN.Tween(_animation)
          .to({ progress: 1 }, 10000)
          .onUpdate(function () {
            document.querySelector('a-image').setAttribute('sprite-sheet', 'progress', _animation.progress)
          })

    tween.onComplete(function () { _animation.progress = 0 })
    tween.chain(tween)
    tween.start()
  }

  componentDidMount () {

    //setTimeout(this.spriteAnimation, 2000)
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    this.setState(newProps)
  }

  constantSceneSwap () {
        // this.maskEl = this.el.sceneEl.querySelector('#mask')

  }

  changeColor () {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue']
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  fightScene () {
    return (
      <Entity scale='15 15 15' position='0 25 -500' environment="groundColor2: #188d85; gridColor: #befb06; dressingColor: #0bf1d4; skyColor: #185f8b; horizonColor: #92E2E2; active: true; seed: 14; skyType: gradient; fog: 0.1; ground: spikes; groundYScale: 4.91; groundColor: #061123; dressing: towers; ; grid: 1x1; preset: tron">
        <Entity position={{x: -2.5, y: 2, z: -4}} scale="0.6 1.2 1" text-geometry="value: ETHERAL; font: #exoFont; bevelEnabled: true; bevelSize: 0.1; bevelThickness: 0.1; curveSegments: 1; size: 1.5; height: 0.5;" material="color:reverseGrd; metalness:0.9; roughness: 0.05; sphericalEnvMap: #chrome;"></Entity>
        <Entity id="ocean"  scale='1 1 1' primitive='a-ocean'   color="#92E2E2" width="100" depth="100" density="35" speed="2" position="0, 0.35, 0" ></Entity>
        <Entity text={{value: 'START', align: 'center'}} position={{x: 0, y: 2, z: -2}} />
        <Entity id='box'  geometry={{primitive: 'box'}} material={{color: this.state.color, opacity: 0.6}} animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}} animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}} position={{x: 0, y: 2, z: -3}} events={{click: () => this.changeColor()}}>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}} geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}} material={{color: '#24CAFF'}} />
        </Entity>
      </Entity>
    )
  }

  mazeScene () {
    return (
      <Entity id='sky' scale='15 15 15' position='0 25 -500' environment='dressingAmount: 0; dressing: trees; fog: 0.1; horizonColor: #bcefef; active: true; seed: 8; skyType: gradient; skyColor: #24b59f;  ground: noise; groundYScale: 2.18; groundTexture: squares; groundColor: #937a24; groundColor2: #987d2e; dressingColor: #888b1d; dressingScale: 1;  gridColor: #c5a543; preset: forest'>
        <Entity id='maze' aframe-maze='' scale='1' />
      </Entity>
    )
  }

  render () {
    return this.state.scene_array[this.state.current_scene]()
  }
}
