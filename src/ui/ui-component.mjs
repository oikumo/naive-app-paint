const uiComponent = (color, target, targetWidth, topX, topY, width, height) => {
    const size = width * height
    let col = 0
    let row = 0
    for (let i = 0; i < size; i++) {
        target[Math.ceil(topX + col) + Math.ceil(topY + row) * targetWidth] = color
        if (col + 1 == width) {
            col = 0
            row++
        }
        else {
            col++
        }
    }
}

export {
    uiComponent
}