/**
 * Created by brsmith on 7/3/17.
 */
import 'aframe'
import 'aframe-look-at-component'
import 'aframe-animation-component'
import 'aframe-text-geometry-component'
import 'aframe-particle-system-component'
import 'aframe-maze-component'
import '@ekolabs/aframe-spritesheet-component'
import 'aframe-villain-component'
import 'aframe-environment-component'
import 'babel-polyfill'
import {lvl1} from '../levels/level1'
import UiEnemeyEncounter from './UiEnemeyEncounter'
import {Entity} from 'aframe-react'
import React from 'react'
import PropTypes from 'prop-types'

type SceneManagerProps = {
    onChange: PropTypes.func.isRequired,
    current_scene: PropTypes.number,
    onEnvLoad: PropTypes.func
}

export default class SceneManager extends React.PureComponent {
  props: SceneManagerProps
  constructor (props) {
    super(props)
    this.state = {
      current_scene: this.props.current_scene,
      color: '#e7ea13',
      scene_array: [
        this.startScene.bind(this),
        this.fightScene.bind(this),
        this.mazeScene.bind(this)
      ],
      scene_envArray: [
        'preset: tron; groundColor2: #188d85; gridColor: #befb06; dressingColor: #0bf1d4; skyColor: #35f700; horizonColor: #92E2E2; active: true; seed: 14; skyType: color; fog: 0.08; ground: spikes; groundYScale: 2.91; groundColor: #061123; dressing: towers; ; grid: 1x1;',
        'preset: forest;lightPosition: 0 50 0; flatShading: true; active: true; seed: 8; skyType: gradient; skyColor: #093db5; horizonColor: #008df9; fog: 0.08; ground: noise; groundYScale: 2.18; groundTexture: squares; groundColor2: #ebff11; groundColor: #058d93; dressing: trees; dressingAmount:100; dressingColor: #e3ff6a; dressingScale: 0; gridColor: #effe48; grid: crosses',
        'preset: forest;lightPosition: 0 50 0; flatShading: true; active: true; seed: 8; skyType: gradient; skyColor: #093db5; horizonColor: #008df9; fog: 0.08; ground: noise; groundYScale: 2.18; groundTexture: squares; groundColor2: #ebff11; groundColor: #058d93; dressing: trees; dressingAmount:100; dressingColor: #e3ff6a; dressingScale: 0; gridColor: #effe48; grid: crosses',
        'active: true; seed: 8; skyType: gradient; skyColor: #24b59f; horizonColor: #eff9b7; fog: 0.08; ground: noise; groundYScale: 2.18; groundTexture: squares; groundColor: #937a24; groundColor2: #987d2e; dressing: trees; dressingAmount:100; dressingColor: #888b1d; dressingScale: 0; gridColor: #c5a543; preset: forest;'
      ]
    }
    var extras = require('aframe-extras')
    window.AFRAME.registerComponent('a-ocean', extras.primitives['a-ocean'])
  }

  stopSpriteAnimation (attr) {
    this[attr].spriteTween.stop()
  }

  spriteAnimation (attr) {
    let _animation = { progress: 0 }
    this[attr] = {}
    this[attr].spriteTween = new window.TWEEN.Tween(_animation)
    .to({ progress: 1 }, 600)
    .onUpdate(function () {
      document.querySelector(attr).setAttribute('sprite-sheet', 'progress', _animation.progress)
    })
    this[attr].spriteTween.onComplete(function () { _animation.progress = 0 })
    this[attr].spriteTween.chain(this[attr].spriteTween)
    this[attr].spriteTween.start()
  }

  componentDidMount () {
    setTimeout(this.props.onEnvLoad, 200)
  }

  componentWillReceiveProps (newProps) {
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

  startFight () {
    // got to fightscene
    // stop animations
    // re-oreient player position
    this.stopSpriteAnimation('[badBot]')
    this.stopSpriteAnimation('[warMachine]')
    document.querySelector('a-camera').object3D.position.set(0, 1.6, 0)
    document.querySelector('a-camera').object3D.rotation.set(0, 0, 0)
    this.props.onChange('#093db5', 'density: 0.2; far: 300; color: #093db5', 1, this.state.scene_envArray)
  }

  startTheGame () {
    setTimeout(() => {
      this.spriteAnimation('[badBot]')
      this.spriteAnimation('[warMachine]')
    }, 800)
    this.props.onChange('#093db5', 'density: 0.2; far: 300; color: #093db5', 2, this.state.scene_envArray)
  }

  fightScene () {
    return (
      <Entity>
        <UiEnemeyEncounter onChange={() => {}} />
      </Entity>
    )
  }

  startScene () {
    return (
      <Entity>
        <Entity position={{x: -2.5, y: 2, z: -8}} scale='0.6 1.2 1' text-geometry='value: ETHERAL; font: #exoFont; bevelEnabled: true; bevelSize: 0.1; bevelThickness: 0.1; curveSegments: 1; size: 1.5; height: 0.5;' material=' metalness:0.9; roughness: 0.05; sphericalEnvMap: #chrome2;' />
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
      <Entity id='maze' aframe-maze={{
        wallMaterial: [
          new window.THREE.MeshLambertMaterial({map: window.THREE.ImageUtils.loadTexture('images/tron1.jpg')}),
          new window.THREE.MeshLambertMaterial({map: window.THREE.ImageUtils.loadTexture('images/tron2.jpg')}),
          new window.THREE.MeshBasicMaterial({map: window.THREE.ImageUtils.loadTexture('images/tree2.png'), transparent: true, opacity: 0.5}),
          new window.THREE.MeshLambertMaterial({color: 0xFBEBCD, opacity: 0.2})],
        map: lvl1,
        UNITSIZE: 126
      }} scale='1'>
        <Entity primitive='a-gltf-model' src='#lotus' position='0,  1.5, 2' />
        <Entity look-at='[camera]' villain={{sceneHasLoaded: true, aispeed: 0.02}} id='villian0' position='0,  1.5, 2'>
          <Entity primitive='a-image' badBot src='images/bad-bot.png' sprite-sheet='cols:40; rows: 1; progress: 0;' scale='3, 3, 3' />
        </Entity>
        <Entity look-at='[camera]' villain={{sceneHasLoaded: true, aispeed: 0.02, collisionDistance: 5, collisionAction: this.startFight.bind(this)}} id='villian1' position='6,  1.5, 4'>
          <Entity primitive='a-image' warMachine src='images/war-machine.png' sprite-sheet='cols:17; rows: 1; progress: 0;' scale='3, 3, 3' />
        </Entity>
        <Entity look-at='[camera]' villain={{sceneHasLoaded: true, aispeed: 0.02/*, collisionAction: this.startFight.bind(this) */}} id='villian2' position='3,  1.5, 8'>
          <Entity primitive='a-image' badBot src='images/bad-bot.png' sprite-sheet='cols:40; rows: 1; progress: 0;' scale='3, 3, 3' />
        </Entity>
        <Entity look-at='[camera]' villain={{sceneHasLoaded: true, aispeed: 0.02}} id='villian3' position='9,  1.5, 6'>
          <Entity primitive='a-image' warMachine src='images/war-machine.png' sprite-sheet='cols:17; rows: 1; progress: 0;' scale='3, 3, 3' />
        </Entity>
      </Entity>
    )
  }

  render () {
    return (
      <Entity id='mainScene' /* animation__sceneFade={{startEvents: 'sceneFade', property: 'environment.skyColor', dir: 'normal', dur: 500, easing: 'easeInSine', loop: false, to: '#24b59f'}} animation__grid={{startEvents: 'fadeGrid', property: 'environment.gridColor', dir: 'alternate', dur: 3000, easing: 'easeInSine', loop: true, from: '#befb06', to: '#fafb72'}} animation={{pauseEvents: 'fadeSkyPause', startEvents: 'fadeSky', property: 'environment.skyColor', dir: 'alternate', dur: 3000, easing: 'easeInSine', loop: true, from: '#23a00a', to: '#0f02a0'}} */ scale='15 15 15' position='0 25 -500' environment={this.state.scene_envArray[this.state.current_scene]}>
        {this.state.scene_array[this.state.current_scene]()}
      </Entity>
    )
  }
}
