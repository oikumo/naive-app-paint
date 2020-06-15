import { test, assertions } from 'naive-tests'
import { red, green } from '../../../src/common/colors.mjs'
import { Selector, SelectorOption } from '../../../src/ui/widgets/selector.mjs'

const { equals, notEquals, sameArrayElements } = assertions

test('selector build ui components', () => {
    const position = { x: 200, y: 100 }
    const elements = [
        { label: 'option a', action: () => { return 'a' } },
        { label: 'option b', action: () => { return 'b' } }
    ]
    const selector = new Selector(position, green, red, elements)

    equals(2, selector.options.length)

    elements.forEach((element, index) => {
        equals(element.label, selector.options[index].label)
        equals(element.action, selector.options[index].action)
    })

    equals('a', selector.options[0].action())
    equals('b', selector.options[1].action())


    equals(selector.options[0], selector.selected)
    notEquals(selector.options[1], selector.selected)

    selector.select({ x: 400, y: 100 })

    notEquals(selector.options[0], selector.selected)
    equals(selector.options[1], selector.selected)
})