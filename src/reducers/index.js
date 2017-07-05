/**
 * Created by brsmith on 7/3/17.
 */
import { combineReducers } from 'redux'

const gameApp = combineReducers({
  game: require('./game').reducer
})

export default gameApp
