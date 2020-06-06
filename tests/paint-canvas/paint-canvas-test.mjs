import { assertions, test } from 'naive-tests'
import { paint } from '../../src/ui/paint-canvas.mjs'
const { equals } = assertions

test('paint into a texture', () => {
    const shape = (x, y) => {
        
    }
    const brush = new Brush(shape)
    const textureWidth = 50
    const textureHeight = 40
    const texture = new Uint32Array(textureWidth * textureHeight)
    //brush.paintTexture(pattern, texture, textureWidth)
    brush.paintColor(color, texture, textureWidth)

})