import { CanvasRenderer, RenderTexture, uiComponent } from 'naive-3d'
import { paint, paintCanvas, paintColor } from './paint-canvas/paint-canvas.mjs'

const interval = 5

const run = () => {
  const canvas = document.getElementById("canvas")
  const canvasRender = new CanvasRenderer(canvas)
  const renderTex = new RenderTexture(canvasRender.imageSize())
  let bgColor = 0xFF474a43
  let painting = false
  const red = 0xFFFF0000
  const green = 0xFF00FF77
  let currentColor = red
  paintColor(currentColor)

  const changeColor = () => {
    currentColor = currentColor === red ? green : red
    paintColor(currentColor)
  }

  canvas.onmousemove = ({ x, y }) => {
    if (painting) paint(x, y)
  }

  canvas.onmousedown = () => painting = true
  canvas.onmouseup = () => {
    changeColor()
    painting = false
  }

  const background = () => uiComponent(0xFFFF5555, renderTex.texture, canvas.width, 0, canvas.height - 200, canvas.width, 200)
  const button = (color, x, y, w, h) => uiComponent(color, renderTex.texture, canvas.width, x, y, w, h)

  const buttonA = () => button(0xFF00FF77, (canvas.width / 2) - 100, canvas.height - 100, 200, 50)
  const buttonB = () => button(0xFFFF0000, (canvas.width / 2) - 100, canvas.height - 150, 200, 50)

  const ui = () => {
    background()
    buttonA()
    buttonB()
  }

  setInterval(() => {
    renderTex.clear(bgColor)
    paintCanvas(renderTex.texture, canvas.width)
    ui()
    canvasRender.draw(renderTex.buf8)
  }, interval)
}

export {
  run
}