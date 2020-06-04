import { CanvasRenderer, RenderTexture } from 'naive-3d'
import { PaintEditor } from './ui/paint-editor.mjs'
import { bgColor } from './ui/colors.mjs'

const interval = 5

const run = () => {
  const canvas = document.getElementById("canvas")
  const canvasRender = new CanvasRenderer(canvas)
  const renderTex = new RenderTexture(canvasRender.imageSize())
  
  const paintEditor = new PaintEditor(canvas.width, canvas.height)
  const { onMove, onActionDown, onActionUp} = paintEditor.events
  canvas.onmousemove = onMove.bind(paintEditor.events)
  canvas.onmousedown = onActionDown.bind(paintEditor.events)
  canvas.onmouseup = onActionUp.bind(paintEditor.events)

  setInterval(() => {
    renderTex.clear(bgColor)
    paintEditor.draw(renderTex.texture, canvas.width)
    canvasRender.draw(renderTex.buf8)
  }, interval)
}

export {
  run
}