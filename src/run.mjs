import { CanvasRenderer, RenderTexture, ui, createRectFromCorners } from 'naive-3d'
import { paint, paintCanvas, paintColor } from './paint-canvas/paint-canvas.mjs'

const interval = 5

const run = () => {
  const canvas = document.getElementById("canvas")
  const canvasRender = new CanvasRenderer(canvas)
  const renderTex = new RenderTexture(canvasRender.imageSize())
  const bgColor = 0xFF474a43
  const red = 0xFF0000FF
  const green = 0xFF00FF00
  const blue = 0xFFFF0000
  const gray = 0xFF111111

  const { createUiComponent, drawUiComponent } = ui
  const rect = createRectFromCorners({ x: 0, y: 100 }, { x: canvas.width, y: 0 })
  const rectButton = createRectFromCorners({ x: 0, y: 150 }, { x: 100, y: 100 })

  const panel = createUiComponent(rect, { x: 0, y: canvas.height - 100 }, gray)
  const buttonRed = createUiComponent(rectButton, { x: 100, y: canvas.height - 100 }, red)
  const buttonGreen = createUiComponent(rectButton, { x: 300, y: canvas.height - 100 }, green)
  const buttonBlue = createUiComponent(rectButton, { x: 500, y: canvas.height - 100 }, blue)

  const drawUi = () => {
    drawUiComponent(panel, renderTex.texture, canvas.width)
    drawUiComponent(buttonRed, renderTex.texture, canvas.width)
    drawUiComponent(buttonGreen, renderTex.texture, canvas.width)
    drawUiComponent(buttonBlue, renderTex.texture, canvas.width)
  }

  let painting = false
  let currentColor = red
  paintColor(currentColor)

  canvas.onmousemove = ({ x, y }) => {
    if (painting) {
      paint(x, y)
    }
  }

  canvas.onmousedown = () => { painting = true }
  canvas.onmouseup = ({ x, y }) => {
    painting = false

    if (buttonRed.inside({ x, y })) {
      paintColor(currentColor)
      currentColor = red
      return
    }

    if (buttonGreen.inside({ x, y })) {
      currentColor = green
      paintColor(currentColor)
      return
    }
    if (buttonBlue.inside({ x, y })) {
      paintColor(currentColor)
      currentColor = blue
      return
    }
  }

  setInterval(() => {
    renderTex.clear(bgColor)
    paintCanvas(renderTex.texture, canvas.width)
    drawUi()
    canvasRender.draw(renderTex.buf8)
  }, interval)
}

export {
  run
}