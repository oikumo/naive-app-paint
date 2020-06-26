import { texture2bmp, bmp2texture } from 'naive-3d'

const Session = function (downloadImage) {
    this.downloadImage = downloadImage
    this.setTexture = () => { }
}

Session.prototype.saveImage = function (texture) {
    const bmp = texture2bmp(texture)
    const filename = "image.bmp"
    this.downloadImage(bmp, filename)
}

Session.prototype.loadImage = function (bmp) {
    const texture = bmp2texture(bmp)
    this.setTexture(texture)
}

export {
    Session
}



