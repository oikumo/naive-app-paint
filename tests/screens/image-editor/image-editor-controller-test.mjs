import { test, assertions } from 'naive-tests'
import { ImageEditorController } from '../../../src/screens/image-editor/image-editor-controller.mjs'
import { green, red } from '../../../src/common/colors.mjs'

const { equals } = assertions

test('create image editor controller', () => {
    const view = {}
    const controller = new ImageEditorController(view)
    equals(red, controller.state.currentColor)
    equals(controller, view.controller)
})

test('image editor color selection', () => {
    const view = {}
    const controller = new ImageEditorController(view)
    equals(red, controller.state.currentColor)
    controller.colorSelected(green)
    equals(green, controller.state.currentColor)
})

test('image editor draw', () => {
    const tex = []
    const texWidth = 100
    let drawCount = 0
    const view = {
        draw: function (t, tw) {
            equals(tex, t)
            equals(texWidth, tw)
            drawCount++
        }
    }
    const controller = new ImageEditorController(view)
    controller.draw(tex, texWidth)
    equals(1, drawCount)
    controller.draw(tex, texWidth)
    equals(2, drawCount)
})

test('image editor brush selection', () => {
    const view = {}
    const controller = new ImageEditorController(view)

    controller.brushCircle()
    controller.paintActive(true)
    controller.paint(10, 11)

    controller.brushTexture()
    controller.paintActive(false)
    controller.paint(10, 11)
})