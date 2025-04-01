# POC-Playwright

Este repositorio contiene una prueba de concepto (PoC) para el uso de Playwright en proyectos de automatización de pruebas, utilizando Cucumber y Node.js.

## Descripción

Este proyecto se centra en explorar las capacidades de Playwright, un marco de automatización de pruebas moderno para navegadores web. La PoC incluye ejemplos básicos de escritura de pruebas utilizando Playwright para interactuar con navegadores como Chrome, Firefox y WebKit, junto con Cucumber para escribir pruebas en lenguaje natural.

## Instalación

1. Clona este repositorio en tu máquina local:
```
git clone [https://github.com/Khimea/POC-Playwright.git](https://github.com/Qualis-Lab-QA/Template-Playwright)
```

2. Navega al directorio del proyecto:
```
cd POC-Playwright
```

3. Instala playwright
```
npx install playwright
```

4. Instala las dependencias utilizando npm:
```
npm install
```

5. Instala extensión de Cucumber en VS Code:

Buscá en el explorador de extensiónes 
```
**Cucumber - Cucumber**
**Playwright Test for VSCode - Microsoft**
**Playwright Test Snippets - Marl Skeleton**
**Gherkin Beautifier - Siarhei Kuchuk**
**test Cucumber (Gherkin) Full Support - Robin GROSS**

```

6. Configura la extensión de Cucumber en VS Code:
Una vez instalada la extensión, hay que ingresar la siguiente configuración en VS Code.
Ingresar a las configuraciones de la extensión y abrir el "Edit in setting.json"
Debemos agregar este codigo dentro del JSON para que funcione de manera correcta la extensión.

```
{
    "cucumberautocomplete.steps": [
        "cypress/e2e/step_definitions/*.js",
        "src/step_definitions/*.js",
        "src/steps/*.js"
    ],
    "cucumberautocomplete.syncfeatures": "features/*.feature",
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "cucumberautocomplete.onTypeFormat": true,
    "cucumberautocomplete.strictGherkinCompletion": true,
    "cucumberautocomplete.strictGherkinValidation": true,
    "tabnine.experimentalAutoImports": true,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "playwright.reuseBrowser": true,
    "playwright.showTrace": false,
    "explorer.confirmDragAndDrop": false,
    "codeium.enableConfig": {
        "*": true,
        "javascript": false
    },
    "explorer.confirmDelete": false,
    "git.confirmSync": false,
    "liveServer.settings.donotShowInfoMsg": true
}
 ```
 7. Instalar Java para el reporte ALLURE:
 
 Es necesario instalar Java para el Allure.

## Uso

Una vez que hayas instalado las dependencias, puedes ejecutar las pruebas utilizando los siguientes comandos:
```
npm run test            # Ejecuta las pruebas de Cucumber y genera reporte
npm run test:local      # Ejecuta las pruebas en modo no headless y genera los reportes
npm run test:headless   # Ejecuta las pruebas en modo headless (sin UI) y genera los reportes
npm run test:mobile     # Ejecuta las pruebas en un entorno simulado de móvil
npm run test:tag        # Ejecuta las pruebas con un filtro de tags
npm run generate-report # Genera y abre el reporte de Allure
```

## Creación de carpeta para Generar Reportes 

Cuando las pruebas se ejecutan de manera local o en un pipeline, se deben los generar las carpetas.
Desde el pipeline se debe pasar la creación de esas carpetas, y desde local se deben crear manualmente las siguientes carpetas:

```
📂 output/
 ┣ 📂 screenshots      ✅ (Capturas de pantalla en caso de fallos)
 ┣ 📂 videos          ✅ (Grabaciones de la ejecución)
 ┣ 📂 allure-report   ✅ (Reporte HTML generado)
 ┗ 📂 allure-results  ✅ (Datos para la generación del reporte)
```

## Pipeline
A la hora de montar el pipeline es indispensable tener:
Sistema Operativo
Playwright
Dependencias del codigo
Java

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu contribución: `git checkout -b feature/nueva-caracteristica`.
3. Realiza tus cambios y haz commit: `git commit -am 'Añade nueva característica'`.
4. Sube tus cambios a tu repositorio: `git push origin feature/nueva-caracteristica`.
5. Envía una solicitud de extracción (pull request).

## Soporte

Si tienes alguna pregunta o encuentras algún problema, no dudes en abrir un issue en el [repositorio](https://github.com/Khimea/POC-Playwright/issues).

## Licencia

Este proyecto está bajo la Licencia [MIT](https://opensource.org/licenses/MIT).
