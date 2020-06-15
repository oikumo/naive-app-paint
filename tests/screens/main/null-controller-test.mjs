import { test, assertions } from 'naive-tests'
import { NullController } from '../../../src/screens/main/null-controller.mjs'

const { noThrowsException } = assertions

test('create null controller', () => {
    const nullController = new NullController()
    noThrowsException(() => nullController.draw())
})