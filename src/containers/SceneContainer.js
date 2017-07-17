/**
 * Created by brsmith on 7/3/17.
 */
import 'aframe'
import 'aframe-animation-component'
import {Entity, Scene} from 'aframe-react'
import React from 'react'
import SceneManager from '../components/SceneManager'
import { connect } from 'react-redux'
import GameActions from '../reducers/game'
import HeroActions from '../reducers/hero'

class SceneContainer extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      'game_scene': (this.props.game_scene === undefined ? 0 : this.props.game_scene)
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
  }

  onTick (time, dt) {
    if (time - this.time < 15000) { return }
    this.time = time
    setTimeout(function () {
      document.querySelector('#mask').emit('fade')
      this.props._setScene({game_scene: this.state.game_scene === 0 ? 1 : 0})
    }.bind(this), 200)
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    this.setState(newProps)
  }

  onChange () {
        // this.maskEl = document.querySelector('#mask')
  }

  render () {
    return (
      <Scene>
        <a-assets>
          <img id='groundTexture' src='https://cdn.aframe.io/a-painter/images/floor.jpg' />
          <img id='skyTexture' src='https://cdn.aframe.io/a-painter/images/sky.jpg' />
        </a-assets>
        <Entity primitive='a-entity' id='player' position='0 0 0' >
          <Entity primitive='a-camera'>
            <Entity primitive='a-cursor' animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}} />
          </Entity>
        </Entity>
        <SceneManager ref='sceneManager' onChange={() => this.onChange()} current_scene={this.state.game_scene} />
        <Entity animation={{startEvents: 'fade', property: 'opacity', dir: 'alternate', dur: 200, easing: 'easeInSine', from: '0', to: '1'}} primitive='a-sky' id='mask' color='#000' opacity='1' height='2048' radius='30' theta-length='90' width='2048' tick-component />
      </Scene>
    )
  }
}

const mapStateToProps = (state) => {
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
