import { test, assertions } from 'naive-tests'
import { MainController } from '../../../src/screens/main/main-controller.mjs'
import { MainView } from '../../../src/screens/main/main-view.mjs'
import { UserEvents } from '../../../src/screens/main/user-events.mjs'
import { Session } from '../../../src/sessions/session.mjs'

const { objAreEquals, areNotUndefinedOrNull, noThrowsException } = assertions

test('create main controller', () => {
    const screen = {
        width: 100,
        height: 100
    }

    const userEvents = new UserEvents()
    const mainView = new MainView(screen)
    const session = new Session(() => { })
    const mainController = new MainController(mainView, userEvents, session)
    areNotUndefinedOrNull(mainController.currentController)
    objAreEquals(mainView, mainController.mainView)
})

test('init main controller', () => {
    const screen = {
        width: 100,
        height: 100
    }

    const userEvents = new UserEvents()
    const subjectOnMove = userEvents.onMove.bind(userEvents)
    const subjectOnActionDown = userEvents.onActionDown.bind(userEvents)
    const subjectOnActionUp = userEvents.onActionUp.bind(userEvents)

    const mainView = new MainView(screen)
    const session = new Session(() => { })
    const mainController = new MainController(mainView, userEvents, session)

    mainController.init()

    noThrowsException(() => subjectOnMove({ x: 1, y: 2 }))
    noThrowsException(() => subjectOnActionDown({ x: 1, y: 2 }))
    noThrowsException(() => subjectOnActionUp({ x: 1, y: 2 }))
})