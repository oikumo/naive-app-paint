const Brush = function (width, height) {
    this.width = width
    this.height = height
}

Brush.prototype.paintTexture = function (texBrush, target, x, y) {
    texBrush.paintTo(target.pixels, target.width, x, y)
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
    Brush
}
