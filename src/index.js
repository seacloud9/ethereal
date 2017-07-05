import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import SceneContainer from './containers/SceneContainer'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {color: 'red'}
  }

  changeColor () {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue']
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  render () {
    return (
      <SceneContainer />
    )
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#sceneContainer'))
