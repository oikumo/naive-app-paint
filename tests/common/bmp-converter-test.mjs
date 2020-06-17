import { test, assertions } from 'naive-tests'
import { red, green, blue } from '../../src/common/colors.mjs'
import { hex2bin, createBMPImage } from '../../src/common/bmp-converter.mjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const { equals, sameArrayElementsOnly } = assertions

test('bmp converter - create header', () => {
    const imageWidth = 4
    const imageHeight = 4
    const imageLength = imageWidth * imageHeight
    const imagePixels = new Uint32Array(imageLength)
    const bmpImage = createBMPImage(imagePixels, imageHeight, imageWidth)
})

test('bmp converter - hex to binary', () => {
    const imageHex = '424D460000000000000036000000280000000200000002000000010018000000000010000000130B0000130B000000000000000000000000FFFFFFFF0000FF000000FF000000'
    const convertedBin = hex2bin(imageHex)
    const binFilePath = path.join(fileURLToPath(import.meta.url), '../../../', 'tests-resources/common/bmp-converter/file-image-bin')
    const binFile = fs.readFileSync(binFilePath)
    sameArrayElementsOnly(binFile, convertedBin)
})