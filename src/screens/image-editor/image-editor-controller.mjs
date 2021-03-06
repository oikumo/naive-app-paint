import { red } from '../../common/colors.mjs'
import { Texture } from 'naive-3d'
import { Circle } from '../../ui/drawing/circle.mjs'
import { DrawingToolbox } from '../../ui/drawing/drawing-toolbox.mjs'
import { BrushTool } from './drawing-toolbox/brush-tool.mjs'
import { PencilTool } from './drawing-toolbox/pencil-tool.mjs'

const State = function () {
    this.painting = false
    this.currentColor = red
    this.panModeActive = false
}

const ImageEditorController = function (view, session) {
    this.drawingTools = new DrawingToolbox()
    this.drawingToolsKeys = {
        BRUSH: 'BRUSH',
        PENCIL: 'PENCIL'
    }
    Object.freeze(this.drawingToolsKeys)
    this.drawingTools.set(this.drawingToolsKeys.BRUSH, new BrushTool(20, 20))
    this.drawingTools.set(this.drawingToolsKeys.PENCIL, new PencilTool(20, 20, red))
    this.brushCircle()

    this.state = new State()
    this.view = view
    this.view.init(this)
    this.session = session

    this.tex = new Texture(320, 320)
    this.texCenter = { x: this.tex.width / 2, y: this.tex.height / 2 }
    this.tex.fill(() => parseInt(0xFFff4405))

    this.session.setTexture = (texture) => {
        this.tex = texture
    }
}

ImageEditorController.prototype.getCurrentColor = function () {
    return this.state.currentColor
}

ImageEditorController.prototype.paintActive = function (active) {
    this.state.painting = active
}

ImageEditorController.prototype.brushCircle = function () {
    this.drawingTools.setCurrentTool(this.drawingToolsKeys.PENCIL)
}

ImageEditorController.prototype.brushTexture = function () {
    this.drawingTools.setCurrentTool(this.drawingToolsKeys.BRUSH)
}

ImageEditorController.prototype.saveImage = function () {
    this.session.saveImage(this.tex)
}

ImageEditorController.prototype.tooglePanModeActive = function () {
    this.state.panModeActive = !this.state.panModeActive
}

ImageEditorController.prototype.pan = function (x, y) {
    if (!this.state.panModeActive)
        return
    this.texCenter.x += x
    this.texCenter.y += y
}


ImageEditorController.prototype.colorSelected = function (color) {
    this.state.painting = false
    this.state.currentColor = color
}

ImageEditorController.prototype.paint = function (x, y) {
    if (!this.state.painting) return
    const dx = x + this.tex.width / 2
    const dy = y - this.tex.height / 2
    this.drawingTools.paint(this.tex, dx, dy, this.state.currentColor)
}

ImageEditorController.prototype.draw = function (texture, textureWidth) {
    this.tex.paintTo(texture, textureWidth, this.texCenter.x, this.texCenter.y)
    this.view.draw(texture, textureWidth)
}

export {
    ImageEditorController
}




