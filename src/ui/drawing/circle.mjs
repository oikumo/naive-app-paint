const Circle = function (radious, width, height) {
    this.radiousSquare = radious * radious
    this.center = {
        x: width / 2,
        y: height / 2
    }
}

Circle.prototype.shouldPaint = function (col, row) {
    const distanceSquare = Math.pow(col - this.center.x, 2) + Math.pow(row - this.center.y, 2)
    return distanceSquare <= this.radiousSquare
}

export {
    Circle
}
