const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const FOLDER_ID = '1ZGFBJKuNcqDY59RQNh8rxR5Jm8emBgg_';
const NOMBRE_ARCHIVO = process.env.nombreArchivo;

if (!NOMBRE_ARCHIVO) {
  console.error('❌ ERROR: La variable de entorno "nombreArchivo" no fue definida.');
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  keyFile: 'service-account.json', // reemplazalo por uso desde secretos si querés
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

async function buscarYDescargarArchivo() {
  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and name='${NOMBRE_ARCHIVO}' and mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  const files = res.data.files;
  if (!files.length) {
    console.error(`❌ No se encontró el archivo "${NOMBRE_ARCHIVO}" en la carpeta.`);
    process.exit(1);
  }

  const file = files[0];
  const destPath = path.join(__dirname, 'downloads', file.name);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  const dest = fs.createWriteStream(destPath);
  const fileRes = await drive.files.get(
    { fileId: file.id, alt: 'media' },
    { responseType: 'stream' }
  );

  await new Promise((resolve, reject) => {
    fileRes.data
      .on('end', () => {
        console.log(`✅ Archivo descargado: ${destPath}`);
        resolve();
      })
      .on('error', (err) => {
        console.error('❌ Error al descargar el archivo:', err);
        reject(err);
      })
      .pipe(dest);
  });
}

buscarYDescargarArchivo();
