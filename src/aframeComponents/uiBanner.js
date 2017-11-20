import 'aframe'
import { Stage, Shape } from 'easeljs/lib/easeljs'
window.AFRAME.registerComponent('draw', require('aframe-draw-component').component)
window.AFRAME.registerComponent('uibanner', {
  dependencies: ['draw'],
  init: function () {
    this.draw = this.el.components.draw
    this.draw.register(this.render.bind(this))
  },
  update: function () {
    this.draw.render()
  },
  render: function () {
    console.log('render')
    var ctx = this.draw.ctx
    var canvas = this.draw.canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const stage = new Stage(canvas)
    let gfx = new Shape()
    gfx.graphics.setStrokeStyle(1)
    gfx.graphics.beginStroke('#f0f809')
    gfx.graphics.beginLinearGradientFill(['#1b5891', '#00a8ab'], [0, 1], 0, 0, canvas.width, canvas.height)
        .drawRect(0, 0, canvas.width, canvas.height)
    gfx.x = 0
    gfx.y = 0
    stage.addChild(gfx)
    stage.update()
  }
})
