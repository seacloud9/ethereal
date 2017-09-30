/**
 * Created by brsmith on 7/3/17.
 */
import 'aframe'
import 'aframe-animation-component'
import 'aframe-text-geometry-component'
import 'aframe-particle-system-component'
import 'aframe-maze-component'
import '@ekolabs/aframe-spritesheet-component'
import 'aframe-villain-component'

import 'aframe-environment-component'
import 'babel-polyfill'
import {Entity} from 'aframe-react'
import React from 'react'
import PropTypes from 'prop-types'

type SceneManagerProps = {
    onChange: PropTypes.func.isRequired,
    current_scene: PropTypes.number
}

export default class SceneManager extends React.PureComponent {
  props: SceneManagerProps
  constructor (props) {
    super(props)
    this.state = {
      current_scene: this.props.current_scene,
      color: 'e7ea13',
      scene_array: [
        this.startScene.bind(this),
        this.fightScene.bind(this),
        this.mazeScene.bind(this)
      ],
      scene_envArray: [
        'groundColor2: #188d85; gridColor: #befb06; dressingColor: #0bf1d4; skyColor: #35f700; horizonColor: #92E2E2; active: true; seed: 14; skyType: color; fog: 0.1; ground: spikes; groundYScale: 4.91; groundColor: #061123; dressing: towers; ; grid: 1x1; preset: tron',
        'preset: forest; active: true; seed: 8; skyType: gradient; skyColor: #24b59f; horizonColor: #eff9b7; fog: 0.08; ground: noise; groundYScale: 4.18; groundTexture: squares; groundColor: #937a24; groundColor2: #987d2e; dressing: trees; dressingAmount:100; dressingColor: #888b1d; dressingScale: 0; gridColor: #c5a543',
        'active: true; seed: 8; skyType: gradient; skyColor: #24b59f; horizonColor: #eff9b7; fog: 0.08; ground: noise; groundYScale: 4.18; groundTexture: squares; groundColor: #937a24; groundColor2: #987d2e; dressing: trees; dressingAmount:100; dressingColor: #888b1d; dressingScale: 0; gridColor: #c5a543; preset: forest;'
      ]
    }

    var extras = require('aframe-extras')
    window.AFRAME.registerComponent('a-ocean', extras.primitives['a-ocean'])
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
     // setTimeout(this.spriteAnimation, 2000)
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    this.setState(newProps)
  }

  constantSceneSwap () {
    this.maskEl = this.el.sceneEl.querySelector('#mask')
  }

  changeColor () {
    const colors = ['#e7ea13', '#13ea2c', '#139cea', '#ea1331', '#13ea31']
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  startTheGame () {
    this.props.onChange('#24b59f', 'density: 0.2; far: 300; color: #24b59f', 2, this.state.scene_envArray)
  }

  fightScene () {
    return (
      <Entity scale='15 15 15' position='0 25 -500' environment='groundColor2: #188d85; gridColor: #befb06; dressingColor: #0bf1d4; skyColor: #185f8b; horizonColor: #92E2E2; active: true; seed: 14; skyType: gradient; fog: 0.05; ground: spikes; groundYScale: 4.91; groundColor: #061123; dressing: towers; ; grid: 1x1; preset: tron' />
    )
  }

  startScene () {
    return (
      <Entity>
        <Entity position={{x: -2.5, y: 2, z: -8}} scale='0.6 1.2 1' text-geometry='value: ETHERAL; font: #exoFont; bevelEnabled: true; bevelSize: 0.1; bevelThickness: 0.1; curveSegments: 1; size: 1.5; height: 0.5;' material='color:#chrome; metalness:0.9; roughness: 0.05; sphericalEnvMap: #chrome2;' />
        <Entity id='ocean' scale='1 1 1' primitive='a-ocean' color='#92E2E2' width='200' depth='200' density='45' speed='2' position='0, 0.45, 0' />
        <Entity text={{value: 'START', align: 'center'}} position={{x: 0, y: 2, z: -2}} />
        <Entity id='box' geometry={{primitive: 'box'}} material={{color: this.state.color, opacity: 0.6}} animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}} animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}} position={{x: 0, y: 2, z: -3}} events={{click: () => this.startTheGame()}}>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}} geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}} material={{color: '#24CAFF'}} />
        </Entity>
      </Entity>
    )
  }

  mazeScene () {
    return (
      <Entity id='maze' aframe-maze='' scale='1'>
        <Entity villan='' id='villian0' position='-4.589928424886385,  41.6, -495.4598174115834'>
          <Entity primitive='a-image' src='images/18.png' sprite-sheet='cols:4; rows: 7; progress: 0;' scale='3, 3, 3' />
        </Entity>
        <Entity villan='' id='villian1' position='-5.589928424886385,  41.6, -495.4598174115834'>
          <Entity primitive='a-image' src='images/18.png' sprite-sheet='cols:4; rows: 7; progress: 0;' scale='3, 3, 3' />
        </Entity>
      </Entity>
    )
  }

  render () {
    return (
      <Entity id='mainScene' scale='15 15 15' position='0 25 -500' environment={this.state.scene_envArray[this.state.current_scene]}>
        {this.state.scene_array[this.state.current_scene]()}
      </Entity>
    )
  }
}
