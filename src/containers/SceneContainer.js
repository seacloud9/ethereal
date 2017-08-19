/**
 * Created by brsmith on 7/3/17.
 */
import 'aframe'
import 'aframe-animation-component'
import GamepadControls from 'aframe-gamepad-controls'
import {Entity, Scene} from 'aframe-react'
import React from 'react'
import SceneManager from '../components/SceneManager'
import { connect } from 'react-redux'
import GameActions from '../reducers/game'
import HeroActions from '../reducers/hero'
import { getLevel, isHealthLow } from '../selectors/hero'

class SceneContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      'game_scene': (this.props.game_scene === undefined ? 0 : this.props.game_scene),
      'hero': this.props.hero

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
    window.AFRAME.registerComponent('gamepad-controls', GamepadControls)
  }

  onTick (time, dt) {
   // TWEEN.update(time)
      // console.log(time)
    if (time - this.time > 150000) { return }
    this.time = time
      /*
    setTimeout(function () {
      document.querySelector('#mask').emit('fade')
      this.props._setScene({game_scene: this.state.game_scene === 0 ? 1 : 0})
    }.bind(this), 5000) */
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

  onChange () {
        // this.maskEl = document.querySelector('#mask')
  }

  getHealth (state) {
    return state.hero.stats.health
  }

  render () {
    return (
      <Scene>
        <a-assets>
          <img id='groundTexture' src='https://cdn.aframe.io/a-painter/images/floor.jpg' crossOrigin='anonymous' />
          <img id='skyTexture' src='https://cdn.aframe.io/a-painter/images/sky.jpg' crossOrigin='anonymous' />
          <img id='pink' src='https://img.gs/bbdkhfbzkk/stretch/http://i.imgur.com/1hyyIUi.jpg' crossOrigin='anonymous' />
          <a-asset-item id='dawningFont' src='https://cdn.glitch.com/c719c986-c0c5-48b8-967c-3cd8b8aa17f3%2FdawningOfANewDayRegular.typeface.json?1490305922844' crossOrigin='anonymous' />
          <a-asset-item id='exoFont' src='https://cdn.glitch.com/c719c986-c0c5-48b8-967c-3cd8b8aa17f3%2Fexo2Black.typeface.json?1490305922150' crossOrigin='anonymous' />
          <a-asset-item id='exoItalicFont' src='https://cdn.glitch.com/c719c986-c0c5-48b8-967c-3cd8b8aa17f3%2Fexo2BlackItalic.typeface.json?1490305922725' crossOrigin='anonymous' />
        </a-assets>
        <Entity primitive='a-camera' gamepad-controls='controller:0; debug:true; acceleration:1360; lookEnabled:true; invertAxisY:true' far='1000' id='camera' wasd-controls='acceleration:1360' camera='userHeight: 1.6' position='0 40 0' look-controls>
          <Entity primitive='a-cursor' animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}} />
        </Entity>
        <Entity id='sky' scale='15 15 15' position='0 25 -500' environment='dressingAmount: 0; dressing: trees; fog: 0.1; horizonColor: #bcefef; active: true; seed: 8; skyType: gradient; skyColor: #24b59f;  ground: noise; groundYScale: 2.18; groundTexture: squares; groundColor: #937a24; groundColor2: #987d2e; dressingColor: #888b1d; dressingScale: 1;  gridColor: #c5a543; preset: forest'>
          <SceneManager ref='sceneManager' onChange={() => this.onChange()} current_scene={this.state.game_scene} />
        </Entity>
        <Entity animation={{startEvents: 'fade', property: 'opacity', dir: 'alternate', dur: 200, easing: 'easeInSine', from: '0', to: '1'}} primitive='a-sky' id='mask' color='#000' opacity='1' height='2048' radius='30' theta-length='90' width='2048' tick-component />

      </Scene>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log(state)
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
