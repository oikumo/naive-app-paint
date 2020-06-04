import { PaintEditorLayout } from './paint-editor-layout.mjs'
import { PaintEvents } from './paint-events.mjs'
import { paintCanvas } from './paint-canvas.mjs'

const PaintEditor = function (width, height) {
    this.layout = new PaintEditorLayout(width, height)
    const { buttonRed, buttonGreen, buttonBlue } = this.layout
    this.events = new PaintEvents(buttonRed, buttonGreen, buttonBlue)
}

PaintEditor.prototype.draw = function (texture, textureWidth) {
    paintCanvas(texture, textureWidth)
    this.layout.draw(texture, textureWidth)
}

export {
    PaintEditor
}




