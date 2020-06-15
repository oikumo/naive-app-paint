import { red } from '../../common/colors.mjs'
import { Texture } from 'naive-3d'
import { Brush } from '../../ui/drawing/brush.mjs'
import { Circle } from '../../ui/drawing/circle.mjs'

const State = function () {
    this.painting = false
    this.currentColor = red
}

const Brushes = function () {
    this.texture = new Brush(20, 20)
    this.circle = new Circle(10, 20, 20)
}

const ImageEditorController = function (view) {
    this.brushes = new Brushes()
    this.state = new State()
    this.view = view
    this.view.controller = this

    this.tex = new Texture(320, 320)
    this.texCenter = { x: this.tex.width / 2, y: this.tex.height / 2 }
    this.tex.fill(() => parseInt(0xFFff4405))

    this.texBrush = new Texture(20, 20)
    this.texBrush.fill(() => parseInt(0xFF00FF77))

    this.currentBrush = this.brushes.texture
}

ImageEditorController.prototype.paintActive = function (active) {
    this.state.painting = active
}

ImageEditorController.prototype.brushCircle = function () {
    this.currentBrush = this.brushes.mask
}

ImageEditorController.prototype.brushTexture = function () {
    this.currentBrush = this.brushes.texture
}

ImageEditorController.prototype.colorSelected = function (color) {
    this.state.painting = false
    this.state.currentColor = color
}

ImageEditorController.prototype.paint = function (x, y) {
    if (!this.state.painting) return
    const dx = x + this.tex.width / 2
    const dy = y - this.tex.height / 2
    this.brushes.texture.paintTexture(this.texBrush, this.tex, dx, dy)
    this.brushes.texture.paintColor(this.state.currentColor, this.tex.pixels, this.tex.width, dx, dy, this.brushes.circle)
}

ImageEditorController.prototype.draw = function (texture, textureWidth) {
    this.tex.paintTo(texture, textureWidth, this.texCenter.x, this.texCenter.y)
    this.view.draw(texture, textureWidth)
}

export {
    ImageEditorController
}




