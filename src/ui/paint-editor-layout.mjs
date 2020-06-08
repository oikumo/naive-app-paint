import { ui } from 'naive-3d'
import { gray, red, green, blue } from './colors.mjs'
const { createUiComponent, drawUiComponent, UiRect } = ui

const PaintEditorLayout = function (width, height) {
    this.width = width
    this.height = height
    this.panel = createUiComponent(new UiRect({ x: 0, y: this.height - 150 }, this.width, 150), gray)
    this.buttonRed = createUiComponent(new UiRect({ x: 100, y: this.height - 100 }, 100, 50), red)
    this.buttonGreen = createUiComponent(new UiRect({ x: 300, y: this.height - 100 }, 100, 50), green)
    this.buttonBlue = createUiComponent(new UiRect({ x: 500, y: this.height - 100 }, 100, 50), blue)
    this.buttonBrushCircle = createUiComponent(new UiRect({ x: 200, y: this.height - 40 }, 25, 25), green)
    this.buttonBrushTexture = createUiComponent(new UiRect({ x: 400, y: this.height - 40 }, 25, 25), blue)
}

PaintEditorLayout.prototype.draw = function (texture, textureWidth) {
    drawUiComponent(this.panel, texture, textureWidth)
    drawUiComponent(this.buttonRed, texture, textureWidth)
    drawUiComponent(this.buttonGreen, texture, textureWidth)
    drawUiComponent(this.buttonBlue, texture, textureWidth)
    drawUiComponent(this.buttonBrushCircle, texture, textureWidth)
    drawUiComponent(this.buttonBrushTexture, texture, textureWidth)
}

export {
    PaintEditorLayout
}