import { assertions, test } from 'naive-tests'
import { Circle } from '../../../src/ui/drawing/circle.mjs'
const { equals } = assertions

test('check if a point is inside a circle', () => {
    const circle = new Circle(5, 10, 10)
    equals(false, circle.shouldPaint(9, 9))
    equals(true, circle.shouldPaint(5, 5))
})