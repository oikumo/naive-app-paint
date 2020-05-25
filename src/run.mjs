import { CanvasRenderer, RenderTexture, Texture } from 'naive-3d'

const interval = 5

export const run = () => {
  const canvas = document.getElementById("canvas")
  const canvasRender = new CanvasRenderer(canvas)

  const renderTex = new RenderTexture(canvasRender.imageSize())
  let bgColor = 0xFF555555

  const texTarget = new Texture(300, 300)
  texTarget.fill(() => parseInt(0xFF0000FF))

  const texBrush = new Texture(50, 50)
  texBrush.fill(() => parseInt(0xFFFF00FF))

  let paint = false

  const paintTarget = (x, y) => {
    texBrush.paintTo(texTarget.pixels, texTarget.width, x - 200 - 25, y - 200 - 25)
  }

  canvas.onmousemove = (evt) => {
    if (!paint) return
    paintTarget(evt.x, evt.y)
  }

  canvas.onmousedown = () => paint = true
  canvas.onmouseup = () => paint = false

  setInterval(() => {
    renderTex.clear(bgColor)
    texTarget.paintTo(renderTex.texture, canvas.width, 200, 200)
    canvasRender.draw(renderTex.buf8)
  }, interval)
}