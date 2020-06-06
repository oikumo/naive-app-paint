import { assertions, test } from 'naive-tests'
import { Texture } from 'naive-3d'
import { Brush } from '../../../src/ui/drawing/brush.mjs'
import { Circle } from '../../../src/ui/drawing/circle.mjs'
const { equals } = assertions

test('draw circles in a texture', () => {
    const tex = new Texture(10, 10)
    const texCenter = { x: tex.width / 2, y: tex.height / 2 }
    tex.fill(() => parseInt(0x00000000))

    const brush = new Brush(10, 10)
    const mask = new Circle(5, 10, 10)

    const color = 0xFF0000FF
    brush.paintColor(color, tex.pixels, tex.width, 0, 0, mask)

    const colored = tex.pixels.filter((pixel) => pixel === color).length

    equals(true, colored < tex.pixels.length)
})

test('draw texture in to other texture', () => {
    const tex = new Texture(20, 20)
    tex.fill(() => parseInt(0x00000000))

    const brush = new Brush(20, 20)
    const texBrush = new Texture(20, 20)
    const color = 0xFF0000FF
    texBrush.fill(() => parseInt(color))

    brush.paintTexture(texBrush, tex, 10, 10)
    const colored = tex.pixels.filter((pixel) => pixel === color).length

    //equals(tex.pixels.length, colored)
})