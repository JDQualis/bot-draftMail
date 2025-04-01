const path = require('path')
var fs = require("fs")

const recordVideo = process.env.VIDEO === 'true' ? true : false
const screenshot = process.env.SCREENSHOT === 'true' ? true : false

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getNameFile = async (scenario) => {
  let { name: scenarioName } = scenario.pickle
  let status = scenario.result ? scenario.result.status : ''
  return `${getDate()}_${status}_${scenarioName}`
}

const getDate = () => {
  const date = new Date()
  const dia = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  const hora = `${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s`
  return `${dia}_${hora}`
}

const takeScreenshot = async (world, nameFile) => {
  if(screenshot){
    try {
      let imagePath = path.resolve(__dirname, `../output/screenshots/${nameFile}.png`)
      let image = await global.page.screenshot()
      await fs.promises.writeFile(imagePath, image)
      attachFile(world, imagePath, "image/png")
    } catch (error) {
      console.error("Error taking screenshot:", error)
    }
  }
}

const saveVideo = async (world, nameFile) => {
  if (recordVideo) {
    try {
      let videoPath = path.resolve(__dirname, `../output/videos/${nameFile}.webm`)
      let tempPath = await global.page.video().path()
      await fs.promises.rename(tempPath, videoPath)
      attachFile(world, videoPath, "video/webm")
    } catch (error) {
      console.error("Error saving video:", error)
    }
  }
}

const attachFile = (world, filePath, mediaType) => {
  if (fs.existsSync(filePath)) {
    world.attach(fs.readFileSync(filePath), {
      mediaType,
      fileName: path.basename(filePath)
    })
  }
}

module.exports = {
  getNameFile,
  getDate,
  takeScreenshot,
  saveVideo
}