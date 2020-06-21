import { NullController } from './null-controller.mjs'
import { ImageEditorController } from "../image-editor/image-editor-controller.mjs"
import { ImageEditorView } from "../image-editor/image-editor-view.mjs"

const MainController = function (view, userEvents, session) {
    this.nullController = new NullController()
    this.currentController = this.nullController
    this.mainView = view
    this.userEvents = userEvents
    this.session = session
}

MainController.prototype.init = function () {
    const view = new ImageEditorView(this.mainView.screen)
    this.userEvents.target = view
    const controller = new ImageEditorController(view, this.session)
    this.currentController = controller
}

MainController.prototype.draw = function (texture, textureWidth) {
    this.currentController.draw(texture, textureWidth)
}

export {
    MainController
}