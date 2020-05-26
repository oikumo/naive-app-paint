import { equals, test } from 'naive-tests'
import { uiComponent } from '../../src/ui/ui-component.mjs'

test('paint component', () => {
    const w = 10
    const h = 20
    const color = 0xFF555555
    const tex = new Uint32Array(w * h)

    const compTopX = 5
    const compTopY = 5
    const compWidth = 5
    const compHeight = 5

    uiComponent(color, tex, w, compTopX, compTopY, compWidth, compWidth)

    let col = 0
    let row = 0
    for (let i = 0; i < w * h; i++) {
        if (compTopX <= col && col < compTopX + compWidth
            && compTopY <= row && row < compTopY + compHeight) {
            equals(tex[i], color)
        }
        else {
            equals(tex[i], 0)
        }
        if (col + 1 == w) {
            col = 0
            row++
        }
        else {
            col++
        }
    }
})