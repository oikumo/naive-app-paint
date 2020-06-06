import { red, green, blue } from './colors.mjs'
import { Brush, Circle } from './paint-canvas.mjs'
import { Texture } from 'naive-3d'

const PaintEvents = function (targetTex, buttonRed, buttonGreen, buttonBlue) {
  this.targetTex = targetTex
  this.buttonRed = buttonRed
  this.buttonGreen = buttonGreen
  this.buttonBlue = buttonBlue
  this.painting = false
  this.currentColor = red
  this.brush = new Brush(20, 20)
  this.mask = new Circle(10, 20, 20)

  this.texBrush = new Texture(20, 20)
  this.texBrush.fill(() => parseInt(0xFF00FF77))
}

PaintEvents.prototype.onMove = function ({ x, y }) {
  if (this.painting) {
    this.brush.paintTexture(this.texBrush, this.targetTex, x, y)
    const dx = x + this.targetTex.width / 2
    const dy = y - this.targetTex.height / 2
    this.brush.paintColor(this.currentColor, this.targetTex.pixels, this.targetTex.width, dx, dy, this.mask)
  }
}

PaintEvents.prototype.paintColor = function (color) {
  this.currentColor = color
}

PaintEvents.prototype.onActionDown = function () { this.painting = true }

PaintEvents.prototype.onActionUp = function ({ x, y }) {
  this.painting = false

  if (this.buttonRed.inside({ x, y })) {
    this.paintColor(red)
    return
  }
  if (this.buttonGreen.inside({ x, y })) {
    this.paintColor(green)
    return
  }
  if (this.buttonBlue.inside({ x, y })) {
    this.paintColor(blue)
    return
  }
}

export {
  PaintEvents
}