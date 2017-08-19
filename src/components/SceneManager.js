/**
 * Created by brsmith on 7/3/17.
 */
import 'aframe'
import 'aframe-animation-component'
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
    setTimeout(this.spriteAnimation, 2000)
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
      <Entity>
        <Entity text={{value: 'Hello, A-Frame React!', align: 'center'}} position={{x: 0, y: 2, z: -1}} />
        <Entity primitive='a-image' src='/images/ninja-adventure-2/characters/18.png' sprite-sheet='cols:4; rows: 7; progress: 0;' position='0 1 -1' scale='0.5, 0.5, 0.5' />
        <Entity id='box' geometry={{primitive: 'box'}} material={{color: this.state.color, opacity: 0.6}} animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}} animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}} position={{x: 0, y: 1, z: -3}} events={{click: () => this.changeColor()}}>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}} geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}} material={{color: '#24CAFF'}} />
        </Entity>
      </Entity>
    )
  }

  mazeScene () {
    return (
      <Entity>
        <Entity primitive='a-image' src='/images/ninja-adventure-2/characters/18.png' sprite-sheet='cols:4; rows: 7; progress: 0;' position='0 40 -4' />
        <Entity id='maze' aframe-maze='' scale='1' />

      </Entity>
    )
  }

  render () {
    return this.state.scene_array[this.state.current_scene]()
  }
}
