import { ui } from 'naive-3d'
const { createUiComponent, drawUiComponent, UiRect } = ui

const SelectorOption = function (label, action, component) {
    this.label = label
    this.action = action
    this.component = component
}

const Selector = function (position, colorNormal, colorSelected, elements) {
    this.colorNormal = colorNormal
    this.colorSelected = colorSelected
    this.selected = null
    this.position = position

    if (elements && elements.length > 0) {
        this.options = createOptionsHorizontal(this.position, elements)
    }
    else {
        this.options = []
    }

    if (this.options.length > 0) {
        this.selected = this.options[0]
        this.selected.component.backgroundColor = () => this.colorSelected
    }
}

const createOptionsHorizontal = function (position, elements) {
    const options = []
    if (elements && elements.length === 0)
        return options

    let topX = position.x
    let topY = position.y
    const color = 0

    for (let element of elements) {
        const component = createUiComponent(new UiRect({ x: topX, y: topY }, 25, 25), color)
        options.push(new SelectorOption(
            element.label,
            element.action,
            component
        ))
        topX += 200
    }

    return options
}

Selector.prototype.select = function (position) {
    if (this.options && this.options.length === 0)
        return false

    for (let option of this.options) {
        if (option.component.inside(position)) {
            if (this.selected !== option) {
                if (this.selected !== null)
                    this.selected.component.backgroundColor = () => this.colorNormal
                this.selected = option
                this.selected.component.backgroundColor = () => this.colorSelected
            }
            return true
        }
    }

    return false
}

export {
    Selector,
    SelectorOption
}