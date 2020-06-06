import { Texture } from 'naive-3d'


const Circle = function (radious, width, height) {
    this.radiousSquare = radious * radious
    this.width = width
    this.height = height
    this.center = {
        x: width / 2,
        y: height / 2
    }
}

Circle.prototype.shouldPaint = function (col, row) {
    const distanceSquare = Math.pow(col - this.center.x, 2) + Math.pow(row - this.center.y, 2)
    return distanceSquare <= this.radiousSquare
}

const Brush = function (width, height) {
    this.width = width
    this.height = height
}

Brush.prototype.paintTexture = function (texBrush, target, x, y) {
    const centerX = texBrush.width / 2
    const centerY = texBrush.height / 2
    const dx = x + target.width / 2 - centerX
    const dy = y - target.height / 2 - centerY
    texBrush.paintTo(target.pixels, target.width, dx, dy)
}

Brush.prototype.paintColor = function (color, target, targetWidth, dx, dy, mask) {
    const width = this.width
    const size = width * this.height
    let col = 0
    let row = 0

    for (let i = 0; i < size; i++) {
        if (mask && mask.shouldPaint(col, row))
            target[(col + dx) + (row + dy) * targetWidth] = color

        if (col + 1 === width) {
            col = 0
            row++
        }
        else {
            col++
        }
    }
}

export {
    Brush,
    Circle
}
