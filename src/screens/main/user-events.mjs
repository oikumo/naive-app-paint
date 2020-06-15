const UserEvents = function () {
    this.target = null
}

UserEvents.prototype.onMove = function ({ x, y }) {
    if (this.target === null) return
    this.target.onMove(x, y)
}

UserEvents.prototype.onActionDown = function ({ x, y }) {
    if (this.target === null) return
    this.target.onActionDown(x, y)
}

UserEvents.prototype.onActionUp = function ({ x, y }) {
    if (this.target === null) return
    this.target.onActionUp(x, y)
}

UserEvents.prototype.removeObservers = function () {
    this.target = null
}

export {
    UserEvents
}