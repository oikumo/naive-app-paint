import { Texture } from 'naive-3d'
import { Brush } from '../../../ui/drawing/brush.mjs'
import { Circle } from '../../../ui/drawing/circle.mjs'

const PencilTool = function (width, height) {
    this.width = width
    this.height = height
    this.tool = new Brush(this.width, this.height)
    this.circle = new Circle(10, 20, 20)
}

PencilTool.prototype.paint = function (targetTexture, dx, dy, color) {
    this.tool.paintColor(color, targetTexture.pixels, targetTexture.width, dx, dy, this.circle)
}

export {
    PencilTool
}


