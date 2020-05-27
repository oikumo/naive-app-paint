import { Texture } from 'naive-3d'

const texTargetX = 160
const texTargetY = 100
const texTarget = new Texture(320, 320)
texTarget.fill(() => parseInt(0xFFff4405))

const texBrush = new Texture(50, 50)
texBrush.fill(() => parseInt(0xFF00FF77))

const paint = (x, y) => {
    const centerX = texBrush.width / 2
    const centerY = texBrush.height / 2
    texBrush.paintTo(texTarget.pixels, texTarget.width, x - texTargetX - centerX, y - texTargetY - centerY)
}

const paintCanvas = (to, toWidth) => texTarget.paintTo(to, toWidth, texTargetX, texTargetY)

const paintColor = (color) => {
    texBrush.fill(() => parseInt(color))
}

export {
    paint,
    paintCanvas,
    paintColor
}
