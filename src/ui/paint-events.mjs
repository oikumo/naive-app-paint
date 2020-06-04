import { red, green, blue } from './colors.mjs'
import { paintColor, paint } from './paint-canvas.mjs'

const PaintEvents = function (buttonRed, buttonGreen, buttonBlue) {
  this.buttonRed = buttonRed
  this.buttonGreen = buttonGreen
  this.buttonBlue = buttonBlue
  this.painting = false
  this.currentColor = red
}

PaintEvents.prototype.onMove = function ({ x, y }) {
  if (this.painting) {
    paint(x, y)
  }
}

PaintEvents.prototype.paintColor = function (color) {
  this.currentColor = color
  paintColor(this.currentColor)
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