import { ui } from 'naive-3d'
import { gray, red, green, blue } from '../../common/colors.mjs'
const { createUiComponent, drawUiComponent, UiRect } = ui

const ImageEditorView = function (screen) {
    this.screen = screen
    this.createUi()
}

ImageEditorView.prototype.createUi = function () {
    const width = this.screen.width
    const height = this.screen.height
    this.panel = createUiComponent(new UiRect({ x: 0, y: height - 150 }, width, 150), gray)
    this.buttonRed = createUiComponent(new UiRect({ x: 100, y: height - 100 }, 100, 50), red)
    this.buttonGreen = createUiComponent(new UiRect({ x: 300, y: height - 100 }, 100, 50), green)
    this.buttonBlue = createUiComponent(new UiRect({ x: 500, y: height - 100 }, 100, 50), blue)
    this.buttonBrushCircle = createUiComponent(new UiRect({ x: 200, y: height - 40 }, 25, 25), green)
    this.buttonBrushTexture = createUiComponent(new UiRect({ x: 400, y: height - 40 }, 25, 25), blue)
    this.buttonSave = createUiComponent(new UiRect({ x: 400, y: height - 200 }, 25, 25), red)
}

ImageEditorView.prototype.onActionUp = function (x, y) {
    this.controller.paintActive(false)
    if (this.actionSelection(x, y)) return
    if (this.brushSelection(x, y)) return
    if (this.brushColorSelection(x, y)) return
}

ImageEditorView.prototype.onMove = function (x, y) {
    this.controller.paint(x, y)
}

ImageEditorView.prototype.onActionDown = function () {
    this.controller.paintActive(true)
}

ImageEditorView.prototype.actionSelection = function (x, y) {
    if (this.buttonSave.inside({ x, y })) {
        this.controller.saveImage()
        return true
    }
    return false
}

ImageEditorView.prototype.brushSelection = function (x, y) {
    if (this.buttonBrushCircle.inside({ x, y })) {
        this.controller.brushCircle()
        return true
    }
    if (this.buttonBrushTexture.inside({ x, y })) {
        this.controller.brushTexture()
        return true
    }
    return false
}

ImageEditorView.prototype.brushColorSelection = function (x, y) {
    if (this.buttonRed.inside({ x, y })) {
        this.controller.colorSelected(red)
        return true
    }
    if (this.buttonGreen.inside({ x, y })) {
        this.controller.colorSelected(green)
        return true
    }
    if (this.buttonBlue.inside({ x, y })) {
        this.controller.colorSelected(blue)
        return true
    }
    return false
}

ImageEditorView.prototype.draw = function (texture, textureWidth) {
    drawUiComponent(this.panel, texture, textureWidth)
    drawUiComponent(this.buttonRed, texture, textureWidth)
    drawUiComponent(this.buttonGreen, texture, textureWidth)
    drawUiComponent(this.buttonBlue, texture, textureWidth)
    drawUiComponent(this.buttonBrushCircle, texture, textureWidth)
    drawUiComponent(this.buttonBrushTexture, texture, textureWidth)
    drawUiComponent(this.buttonSave, texture, textureWidth)
}

export {
    ImageEditorView
}