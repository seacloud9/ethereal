/**
 * Created by brsmith on 7/3/17.
 */
import 'aframe';
import 'aframe-animation-component';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import SceneManager from '../components/SceneManager'
import { connect } from 'react-redux'
import GameActions from '../reducers/game'

class SceneContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'game_scene': (this.props.game_scene === undefined ? 0:this.props.game_scene)
        }

        AFRAME.registerComponent.apply(this, ['tick-component', {
            init: function () {
                this.maskEl = this.el.sceneEl.querySelector('#mask');
                this.index = 0;
            },
            tick: function (time, dt) {
                this.onTick(time, dt)
            }.bind(this)
        }]);
    }

    onTick(time, dt){
        if (time - this.time < 5000) { return; }
        this.time = time;
        this.maskEl = document.querySelector('#mask')
        //console.log(self.maskEl.emit('fade'))
        // Set template.
        //this.maskEl.emit('fade');
        setTimeout(function () {
           // this.maskEl.emit('fade');
            this.props._setScene( {game_scene: this.state.game_scene === 0 ? 1:0 })
        }.bind(this), 200);
    }

    componentWillReceiveProps (newProps) {
        this.forceUpdate()
        this.setState(newProps)
    }


    onChange(){
        //this.maskEl = document.querySelector('#mask')
    }

    render () {
        return (
            <Scene>
            <a-assets>
            <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
            <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
            </a-assets>
            <Entity primitive="a-entity"  id="player" position="0 0 0" >
                <Entity primitive="a-camera">
                        <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
                </Entity>
            </Entity>
            <SceneManager ref='sceneManager'  onChange={() => this.onChange()} current_scene={this.state.game_scene} />
            <Entity primitive="a-sky" id="mask" color="#111" opacity="1"   height="2048" radius="30"  theta-length="90" width="2048" tick-component>
            <Entity primitive="a-animation"  attribute="material.opacity" begin="fade" from="0" to="1" dur="200" direction="alternate" repeat="1"></Entity>
            </Entity>
            </Scene>
        )
    }
}


const mapStateToProps = (state) => {
    return  ({
        game_scene: state.game.game_scene
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        _setScene: (data) => dispatch(GameActions.setScene(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneContainer)

