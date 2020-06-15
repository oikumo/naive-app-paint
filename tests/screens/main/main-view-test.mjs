import { test, assertions } from 'naive-tests'
import { MainView } from '../../../src/screens/main/main-view.mjs'

const { objAreEquals } = assertions

test('create main view', () => {
    const screen = {
        width: 100,
        height: 100
    }

    const mainView = new MainView(screen)
    objAreEquals(screen, mainView.screen)
})