const downloadImage = (byteArray, filename) => {
    var a = window.document.createElement('a')
    a.href = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }))
    a.download = filename;
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

export { 
    downloadImage
}