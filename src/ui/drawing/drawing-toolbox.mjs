const DrawingToolbox = function () {
    this.drawingTools = new Map()
    this.currentTool = null
}

DrawingToolbox.prototype.set = function (key, toolFunction) {
    this.drawingTools.set(key, toolFunction)
}

DrawingToolbox.prototype.setCurrentTool = function (key) {
    const tool = this.drawingTools.get(key)
    if (tool === undefined) return
    this.currentTool = tool
}

DrawingToolbox.prototype.paint = function (targetTexture, dx, dy, color) {
    if (this.currentTool === null) return
    this.currentTool.paint(targetTexture, dx, dy, color)
}

export {
    DrawingToolbox
}