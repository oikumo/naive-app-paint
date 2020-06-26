const registerDropImageArea = (dropAreaId, loadImage) => {
    const dropArea = document.getElementById(dropAreaId)
    dropArea.addEventListener('dragover', (event) => {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    });

    dropArea.addEventListener('drop', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const fileList = event.dataTransfer.files;
        fileList[0].arrayBuffer().then(buffer => {
            const image = new Uint8Array(buffer)
            loadImage(image)
            console.log(image)
        })
    });
}

export {
    registerDropImageArea
}


