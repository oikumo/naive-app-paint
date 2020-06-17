const hex2bin = (hex) => {
    if (!hex) {
        return new Uint8Array();
    }

    var a = [];
    for (var i = 0, len = hex.length; i < len; i += 2) {
        a.push(parseInt(hex.substr(i, 2), 16));
    }

    return new Uint8Array(a);
}

const createBMPImage = (imagePixels, imageHeight, imageWidth) => {
    return null
}

export {
    createBMPImage,
    hex2bin
}