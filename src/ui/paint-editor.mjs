import { PaintEditorLayout } from './paint-editor-layout.mjs'
import { PaintEvents } from './paint-events.mjs'
import { Texture } from 'naive-3d'

const PaintEditor = function (width, height) {
    this.layout = new PaintEditorLayout(width, height)
    const { buttonRed, buttonGreen, buttonBlue } = this.layout

    this.tex = new Texture(320, 320)
    this.texCenter = { x: this.tex.width / 2, y: this.tex.height / 2 }
    this.tex.fill(() => parseInt(0xFFff4405))
    this.events = new PaintEvents(this.tex, buttonRed, buttonGreen, buttonBlue)
}

PaintEditor.prototype.draw = function (texture, textureWidth) {
    this.tex.paintTo(texture, textureWidth, this.texCenter.x, this.texCenter.y)
    //paintCanvas(texture, textureWidth)
    this.layout.draw(texture, textureWidth)
}

export {
    PaintEditor
}




