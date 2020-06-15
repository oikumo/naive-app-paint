import { test, assertions } from 'naive-tests'
import { UserEvents } from '../../../src/screens/main/user-events.mjs'

const { equals, objAreEquals, areNotUndefinedOrNull, noThrowsException } = assertions

test('suscribe user events', () => {
    const userEvents = new UserEvents()
    const subjectOnMove = userEvents.onMove.bind(userEvents)
    const subjectOnActionDown = userEvents.onActionDown.bind(userEvents)
    const subjectOnActionUp = userEvents.onActionUp.bind(userEvents)

    let onMoveCalls = 0
    let onActionDownCalls = 0
    let onActionUpCalls = 0

    const target = {
        onMove: (x, y) => {
            onMoveCalls++
            equals(1, x)
            equals(2, y)
        },
        onActionDown: (x, y) => {
            onActionDownCalls++
            equals(1, x)
            equals(2, y)
        },
        onActionUp: (x, y) => {
            onActionUpCalls++
            equals(1, x)
            equals(2, y)
        }
    }

    userEvents.target = target

    noThrowsException(() => subjectOnMove({ x: 1, y: 2 }))
    noThrowsException(() => subjectOnActionDown({ x: 1, y: 2 }))
    noThrowsException(() => subjectOnActionUp({ x: 1, y: 2 }))

    equals(onMoveCalls, 1)
    equals(onActionDownCalls, 1)
    equals(onActionUpCalls, 1)
})