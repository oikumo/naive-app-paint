import { ui } from 'naive-3d'
import { gray, red, green, blue } from '../../common/colors.mjs'
const { createUiComponent, drawUiComponent, UiRect } = ui

const ImageEditorView = function (screen) {
    this.screen = screen
}

ImageEditorView.prototype.init = function (controller) {
    this.controller = controller
    this.createUi()
}

ImageEditorView.prototype.createUi = function () {
    const width = this.screen.width
    const height = this.screen.height
    this.lastMovePosition = { x: 0, y: 0 }
    this.deltaPosition = { x: 0, y: 0 }

    const leftPanelWidth = width * 0.15
    this.panelLeft = createUiComponent(new UiRect({ x: 0, y: 0 }, leftPanelWidth, height), gray)
    const leftButtonXOffset = width * 0.025
    const leftButtonWidth = width * 0.1
    const leftButtonHeight = height * 0.05
    this.buttonBrushCircle = createUiComponent(new UiRect({ x: leftButtonXOffset, y: height * 0.1 }, leftButtonWidth, leftButtonHeight), green)
    this.buttonBrushTexture = createUiComponent(new UiRect({ x: leftButtonXOffset, y: height * 0.2 }, leftButtonWidth, leftButtonHeight), blue)
    this.buttonPan = createUiComponent(new UiRect({ x: leftButtonXOffset, y: height * 0.3 }, leftButtonWidth, leftButtonHeight), blue)
    this.buttonSave = createUiComponent(new UiRect({ x: leftButtonXOffset, y: height * 0.4 }, leftButtonWidth, leftButtonHeight), red)


    const RightPanelWidth = width * 0.15
    this.panelRight = createUiComponent(new UiRect({ x: width * 0.85, y: 0 }, RightPanelWidth, height), gray)
    const buttonXOffset = width * 0.88
    const buttonWidth = width * 0.1
    const buttonHeight = height * 0.1
    this.buttonRed = createUiComponent(new UiRect({ x: buttonXOffset, y: height * 0.1 }, buttonWidth, buttonHeight), red)
    this.buttonGreen = createUiComponent(new UiRect({ x: buttonXOffset, y: height * 0.2 }, buttonWidth, buttonHeight), green)
    this.buttonBlue = createUiComponent(new UiRect({ x: buttonXOffset, y: height * 0.3 }, buttonWidth, buttonHeight), blue)

    this.currentColor = createUiComponent(new UiRect({ x: buttonXOffset, y: height * 0.85 }, buttonWidth, buttonHeight), red)
    this.currentColor.backgroundColor = this.controller.getCurrentColor.bind(this.controller)
}

ImageEditorView.prototype.onActionUp = function (x, y) {
    this.controller.paintActive(false)
    if (this.actionSelection(x, y)) return
    if (this.brushSelection(x, y)) return
    if (this.brushColorSelection(x, y)) return
    if (this.panModeSelection(x, y)) return
}

ImageEditorView.prototype.onMove = function (x, y) {
    this.controller.paint(x, y)

    this.deltaPosition = {
        x: x - this.lastMovePosition.x,
        y: y - this.lastMovePosition.y
    }

    this.lastMovePosition = { x, y }
}

ImageEditorView.prototype.onActionDown = function () {
    this.controller.paintActive(true)

    if (this.controller.state.panModeActive) {
        this.controller.pan(this.deltaPosition.x, this.deltaPosition.y)
    }
}

ImageEditorView.prototype.panModeSelection = function (x, y) {
    if (this.buttonPan.inside({ x, y })) {
        this.controller.tooglePanModeActive()
        return true
    }
    return false
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
    drawUiComponent(this.panelLeft, texture, textureWidth)
    drawUiComponent(this.buttonBrushCircle, texture, textureWidth)
    drawUiComponent(this.buttonBrushTexture, texture, textureWidth)
    drawUiComponent(this.buttonPan, texture, textureWidth)
    drawUiComponent(this.buttonSave, texture, textureWidth)

    drawUiComponent(this.panelRight, texture, textureWidth)
    drawUiComponent(this.buttonRed, texture, textureWidth)
    drawUiComponent(this.buttonGreen, texture, textureWidth)
    drawUiComponent(this.buttonBlue, texture, textureWidth)
    drawUiComponent(this.currentColor, texture, textureWidth)
}

export {
    ImageEditorView
}