import { texture2bmp } from 'naive-3d'

function saveByteArray(byteArray, filename) {
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }));
    a.download = filename;
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
}

const Session = function () { }

Session.prototype.saveImage = function (texture) {
    const bmp = texture2bmp(texture)
    const filename = "image.bmp"
    saveByteArray(bmp, filename)
}

export {
    Session
}



