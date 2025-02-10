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
**Gherkin Beautifier**
```

6. Configura la extensión de Cucumber en VS Code:
Una vez instalada la extensión, hay que ingresar la siguiente configuración en VS Code.
Ingresar a las configuraciones de la extensión y abrir el "Edit in setting.json"
Debemos agregar este codigo dentro del JSON para que funcione de manera correcta la extensión.

```
"cucumberautocomplete.steps": [
        "cypress/e2e/step_definitions/*.js",
        "src/step_definitions/*.js"
    ],
    "cucumberautocomplete.syncfeatures": "features/*.feature",
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "cucumberautocomplete.onTypeFormat": true,
    "cucumberautocomplete.strictGherkinCompletion": true,
    "cucumberautocomplete.strictGherkinValidation": true,
 ```


## Uso

Una vez que hayas instalado las dependencias, puedes ejecutar las pruebas utilizando el siguiente comando:
```
npm test
```

Este comando ejecutará las pruebas definidas en el directorio `tests/`.


Algunas de las opciones de ejecución de los test son:

```sh
npm test:cucumber   # Dispara los escenarios del feature
npm test:local      # Dispara la ejecución de manera headless y genera los reportes
```

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
