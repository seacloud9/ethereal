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

    window.AFRAME.registerComponent.apply(this, ['tick-component', {
      init: function () {
        this.maskEl = this.el.sceneEl.querySelector('#mask')
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
   TWEEN.update(time)
    if (time - this.time < 15000) { return }
    this.time = time
    setTimeout(function () {
      document.querySelector('#mask').emit('fade')
      this.props._setScene({game_scene: this.state.game_scene === 0 ? 1 : 0})
    }.bind(this), 5000)
    
  }

  componentDidMount () {
    this.props._gainXp({payload: 100})
    console.log(this.props)
    console.log(this.state)
    // let level = Object.assign({}, this.state.hero.level)
    this.setState({level: getLevel(this.props.store.getState())})
    console.log(isHealthLow(this.props.store.getState()))
    console.log(getLevel(this.props.store.getState()))
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    this.setState(newProps)
  }

  onChange (_sceneColor = '#35f700', _fog = 'density: 0.2; far: 500; color: #35f700', _gameScene = 0, _envs) {
    this.maskEl = document.querySelector('#mask')
        // kind of redundant why? https://github.com/feiss/aframe-environment-component/issues/5
    document.querySelector('#mainScene').setAttribute('environment', _envs[_gameScene])
    this.setState({sceneColor: _sceneColor, sceneFog: _fog, game_scene: _gameScene})
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
        style={styleBG} stats>
        <a-assets>
          <img id='groundTexture' src='https://cdn.aframe.io/a-painter/images/floor.jpg' crossOrigin='anonymous' />
          <img id='skyTexture' src='https://cdn.aframe.io/a-painter/images/sky.jpg' crossOrigin='anonymous' />
          <img id='chrome' src='/images/chrome.png' crossOrigin='anonymous' />
          <img id='chrome2' src='/images/chrome2.png' crossOrigin='anonymous' />
          <a-asset-item id='dawningFont' src='/js/Zorque_Regular.json' />
          <a-asset-item id='exoFont' src='/js/Zorque_Regular.json' />
          <a-asset-item id='exoItalicFont' src='/js/Zorque_Regular.json' />
        </a-assets>
        <Entity primitive='a-camera' /* gamepad-controls='controller:0; debug:true; acceleration:1360; lookEnabled:true; invertAxisY:true' */ far='1000' id='camera' wasd-controls='acceleration:1360' camera='userHeight: 1.6' position='-4.589928424886385,  41.6, -495.4598174115834' look-controls>
          <Entity primitive='a-cursor' animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}} />
        </Entity>
        <Entity >
          <SceneManager ref='sceneManager' onChange={(_sceneColor, _fog, _gameScene, _envs) => this.onChange(_sceneColor, _fog, _gameScene, _envs)} current_scene={this.state.game_scene} />
        </Entity>
        <Entity animation={{startEvents: 'fade', property: 'opacity', dir: 'alternate', dur: 200, easing: 'easeInSine', from: '0', to: '1'}} primitive='a-sky' id='mask' color='#000' opacity='1' height='2048' radius='30' theta-length='90' width='2048' tick-component />
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
