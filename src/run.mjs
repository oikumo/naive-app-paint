import { CanvasRenderer, RenderTexture } from 'naive-3d'
import { uiComponent } from './ui/ui-component.mjs'
import { paint, paintCanvas } from './paint-canvas/paint-canvas.mjs'

const interval = 5

const run = () => {
  const canvas = document.getElementById("canvas")
  const canvasRender = new CanvasRenderer(canvas)
  const renderTex = new RenderTexture(canvasRender.imageSize())
  let bgColor = 0xFF474a43
  let painting = false

  canvas.onmousemove = ({ x, y }) => { if (painting) paint(x, y) }
  canvas.onmousedown = () => painting = true
  canvas.onmouseup = () => painting = false

  const ui = () => {
    uiComponent(0xFFFF5555, renderTex.texture, canvas.width, 0, canvas.height - 200, canvas.width, 200)
    uiComponent(0xFF00FF77, renderTex.texture, canvas.width, (canvas.width / 2) - 100, canvas.height - 100, 200, 50)
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