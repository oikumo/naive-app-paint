import { CanvasRenderer, RenderTexture } from 'naive-3d'
import { MainController } from './screens/main/main-controller.mjs'
import { MainView } from './screens/main/main-view.mjs'
import { UserEvents } from './screens/main/user-events.mjs'
import { bgColor } from './common/colors.mjs'

const interval = 5

const run = () => {
  const canvas = document.getElementById("canvas")
  const canvasRender = new CanvasRenderer(canvas)
  const renderTex = new RenderTexture(canvasRender.imageSize())

  const userEvents = new UserEvents()
  canvas.onmousemove = userEvents.onMove.bind(userEvents)
  canvas.onmousedown = userEvents.onActionDown.bind(userEvents)
  canvas.onmouseup = userEvents.onActionUp.bind(userEvents)

  const screen = {
    width: canvas.width,
    height: canvas.height
  }

  const mainView = new MainView(screen)
  const mainController = new MainController(mainView, userEvents)
  mainController.init()

  setInterval(() => {
    renderTex.clear(bgColor)
    mainController.draw(renderTex.texture, canvas.width)
    canvasRender.draw(renderTex.buf8)
  }, interval)
}

export {
  run
}