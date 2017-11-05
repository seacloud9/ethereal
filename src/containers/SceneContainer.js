/**
 * Created by brsmith on 7/3/17.
 */
import 'aframe'
import 'aframe-animation-component'
import 'aframe-effects'
import GamepadControls from 'aframe-gamepad-controls'
import {Entity, Scene} from 'aframe-react'
import React from 'react'
import SceneManager from '../components/SceneManager'
import { connect } from 'react-redux'
import GameActions from '../reducers/game'
import HeroActions from '../reducers/hero'
import { getLevel, isHealthLow } from '../selectors/hero'

class SceneContainer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      'game_scene': (this.props.game_scene === undefined ? 0 : this.props.game_scene),
      'hero': this.props.hero,
      'sceneColor': '#35f700',
      'sceneFog': 'density: 0.2; far: 500; color: #35f700'
    }
    window.AFRAME.registerComponent('gamepad-controls', GamepadControls)
    window.AFRAME.registerComponent.apply(this, ['tick-component', {
      init: function () {
        this.maskEl = document.querySelector('#mask')
        this.index = 0
      },
      tick: function (time, dt) {
        this.onTick(time, dt)
      }.bind(this)
    }])
    var extras = require('aframe-extras')

    extras.registerAll()
  }

  onTick (time, dt) {
    /*
   TWEEN.update(time)
    if (time - this.time < 15000) { return }
    this.time = time
    setTimeout(function () {
      document.querySelector('#mask').emit('fade')
      this.props._setScene({game_scene: this.state.game_scene === 0 ? 1 : 0})
    }.bind(this), 5000)
    */

  }

  componentDidMount () {
    this.props._gainXp({payload: 100})
    console.log(this.props)
    console.log(this.state)
    // let level = Object.assign({}, this.state.hero.level)
    this.setState({level: getLevel(this.props.store.getState())})
    console.log(isHealthLow(this.props.store.getState()))
    console.log(getLevel(this.props.store.getState()))
    document.querySelector('#mask').setAttribute('rotation', 'x', 0)
    this.setControllerListners()
  }

  setControllerListners () {
    var el = document.querySelector('#camera')
    el.addEventListener('gamepadbuttondown', function (e) {
      console.log('Button "%d" has been pressed.', e.index)
    })
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    this.setState(newProps)
  }

  onEnvLoad () {
    document.querySelector('#mainScene').emit('fadeSky')
  }

  onEnvSceneLoad (_envs, _gameScene, _sceneColor, _fog) {
    document.querySelector('#mainScene').setAttribute('environment', _envs[_gameScene])
    this.setState({sceneColor: _sceneColor, sceneFog: _fog, game_scene: _gameScene}, () => {
      document.querySelector('#villian0').object3D.children[0].visible = false
    })
  }

  onChange (_sceneColor = '#35f700', _fog = 'density: 0.2; far: 500; color: #35f700', _gameScene = 0, _envs) {
    this.maskEl = document.querySelector('#mask')
    this.maskEl.setAttribute('visible', true)
    this.maskEl.emit('fade')
    // hacky but has a better fade if add this event listner in and then do not user it
    this.maskEl.addEventListener('animationcomplete', () => {})
    setTimeout(this.onEnvSceneLoad.bind(this, _envs, _gameScene, _sceneColor, _fog), 220)
  }

  getHealth (state) {
    return state.hero.stats.health
  }

  render () {
    var styleBG = 'background-color:' + this.state.sceneColor
    return (
      <Scene // effects="fxaa"
        bloom='radius: 0.66'
        fxaa='true'
        godrays='src: #sun; threshold: 0. 0.33; intensity: 2'
        glitch='true'
        antialias='false'
        fog={this.state.sceneFog}
        style={styleBG} >
        <a-assets>
          <img id='groundTexture' src='https://cdn.aframe.io/a-painter/images/floor.jpg' crossOrigin='anonymous' />
          <img id='skyTexture' src='https://cdn.aframe.io/a-painter/images/sky.jpg' crossOrigin='anonymous' />
          <img id='chrome' src='./images/chrome.png' crossOrigin='anonymous' />
          <img id='chrome2' src='./images/chrome2.png' crossOrigin='anonymous' />
          <a-asset-item id='dawningFont' src='./js/Zorque_Regular.json' />
          <a-asset-item id='exoFont' src='./js/Zorque_Regular.json' />
          <a-asset-item id='exoItalicFont' src='./js/Zorque_Regular.json' />
        </a-assets>
        <Entity primitive='a-entity' position='-4.589928424886385 41.6 -495.4598174115834'>
          <Entity primitive='a-camera' camera='userHeight: 1.6;' gamepad-controls='controller:0; debug:true; acceleration:1360; lookEnabled:false; invertAxisY:true' id='camera' position='0,  0, 0' >
            <Entity primitive='a-cursor' animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 200}} />
            <Entity visible='false' animation={{property: 'material.opacity', dir: 'alternate', startEvents: 'fade', from: '0', to: '1', dur: 200}} opacity='0' primitive='a-sphere' id='mask' material='color: #000; side: back;' radius='10' />
          </Entity>
        </Entity>
        <Entity>
          <SceneManager ref='sceneManager' onEnvLoad={this.onEnvLoad.bind(this)} onChange={(_sceneColor, _fog, _gameScene, _envs) => this.onChange(_sceneColor, _fog, _gameScene, _envs)} current_scene={this.state.game_scene} />
        </Entity>
      </Scene>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
    game_scene: state.game.game_scene,
    hero: state.hero
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    _gainXp: (action) => dispatch(HeroActions.gainXp(action)),
    _takeDamage: (action) => dispatch(HeroActions.takeDamage(action)),
    _drinkPotion: (action) => dispatch(HeroActions.drinkPotion(action)),
    _levelUp: (action) => dispatch(HeroActions.levelUp(action)),
    _move: (action) => dispatch(HeroActions.move(action)),
    _setScene: (data) => dispatch(GameActions.setScene(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneContainer)
