var fs = require("fs");
const path = require('path');

const recordVideo = process.env.VIDEO === 'true' ? true : false;
const screenshot = process.env.SCREENSHOT === 'true' ? true : false;

const getNameFile = async (scenario) => {
    let { name: scenarioName } = scenario.pickle;
    let status = scenario.result ? scenario.result.status : '';
    return `${getDate()}_${status}_${scenarioName}`;
}

const takeScreenshot = async (nameFile) => {
    if (screenshot) {
        try {
            let image = await global.page.screenshot();
            await fs.promises.writeFile(`./screenshots/${nameFile}.png`, image, 'base64');
            //console.log("Screenshot guardada: " + nameFile);
        } catch (err) {
            console.log(err);
        }
    }
};

const saveVideo = async (nameFile) => {
    if (recordVideo) {
        videoname = await page.video().path()
        global.page.close();
        try {
            await fs.promises.rename(videoname, "./videos/" + nameFile + ".webm");
            //console.log("Video guardado: " + nameFile);
        } catch (error) {
            console.error("Error al guardar el video:", error);
        }
    }
};

const getDate = () => {
    const date = new Date();
    const dia = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const hora = `${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s`;
    return `${dia}_${hora}`;
};

module.exports = {
    takeScreenshot,
    getDate,
    getNameFile,
    saveVideo
};
