import { Texture } from 'naive-3d'
import { Brush } from '../../../ui/drawing/brush.mjs'

const BrushTool = function (width, height, texture) {
    this.width = width
    this.height = height
    this.tool = new Brush(this.width, this.height)
    if (texture === undefined) {
        this.texture = new Texture(this.width, this.height)
        this.texture.fill(() => parseInt(0xFF000000))
    } else {
        this.texture = texture
    }
}

BrushTool.prototype.paint = function (targetTexture, dx, dy) {
    this.tool.paintTexture(this.texture, targetTexture, dx, dy)
}

export {
    BrushTool
}
