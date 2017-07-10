import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { reducer as statsReducer } from './stats'
import { reducer as inventoryReducer } from './inventory'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gainXp: ['action'],
  takeDamage: ['action'],
  drinkPotion: ['action'],
  levelUp: null,
  move: ['action']
})

const levels = [
    { xp: 0, maxHealth: 50 }, // Level 1
    { xp: 100, maxHealth: 55 }, // Level 2
    { xp: 250, maxHealth: 60 }, // Level 3
    { xp: 500, maxHealth: 67 }, // Level 4
    { xp: 1000, maxHealth: 75 } // Level 5
]

export const HeroTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  level: 1,
  xp: 0,
  position: {
    x: 0,
    y: 0
  },
  stats: {
    health: 50,
    maxHealth: 50
  },
  inventory: {
    potions: 2
  }
})

/* ------------- Reducers ------------- */

export const levelUp = (state) => {
  const level = state.level + 1
  return { ...state, level }
}

export const gainXp = (state, action) => {
  let { level, xp } = state
  xp += action.payload
  if (xp === levels[level].xp) {
    level++
  }

  return { ...state, level, xp }
    // return state.merge({ game_scene: data.game_scene })
}

export const move = (state, action) => {
  let { position: { x, y } } = state
  x += action.payload.x
  y += action.payload.y
  return { ...state, position: { x, y } }
}

export const takeDamage = (state, action) => {
  return {
    ...state,
    stats: statsReducer(this.state.stats, action)
  }
}

export const drinkPotion = (state, action) => {
  return {
    ...state,
    stats: statsReducer(this.state.stats, action),
    inventory: inventoryReducer(this.state.inventory, action)
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAIN_XP]: gainXp,
  [Types.TAKE_DAMAGE]: takeDamage,
  [Types.DRINK_POTION]: drinkPotion,
  [Types.LEVEL_UP]: levelUp,
  [Types.MOVE]: move
})
