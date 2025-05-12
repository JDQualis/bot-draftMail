const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const { google } = require('googleapis');
const generarContenidoIA = require('./pasarPrompt');

const FOLDER_ID = '1ZGFBJKuNcqDY59RQNh8rxR5Jm8emBgg_';
const nombreArchivo = process.env.nombreArchivo || 'La_Caja.xlsx';

function obtenerFechaActual() {
  const hoy = new Date();
  const dd = String(hoy.getDate()).padStart(2, '0');
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const yyyy = hoy.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

async function procesarYSubir() {
  console.log('🚀 Iniciando proceso de autenticación con Google Drive...');
  const auth = new google.auth.GoogleAuth({
    keyFile: 'service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  console.log('📁 Buscando o creando carpeta output...');
  let outputFolderId;
  const outputSearch = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and name='output' and mimeType='application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
  });

  if (outputSearch.data.files.length > 0) {
    outputFolderId = outputSearch.data.files[0].id;
    console.log(`📂 Carpeta output encontrada con ID: ${outputFolderId}`);
  } else {
    const outputCreate = await drive.files.create({
      requestBody: {
        name: 'output',
        mimeType: 'application/vnd.google-apps.folder',
        parents: [FOLDER_ID],
      },
      fields: 'id',
    });
    outputFolderId = outputCreate.data.id;
    console.log(`📂 Carpeta output creada con ID: ${outputFolderId}`);
  }

  const fecha = obtenerFechaActual();
  let fechaFolderId;
  console.log(`📁 Buscando o creando subcarpeta por fecha: ${fecha}`);
  const fechaSearch = await drive.files.list({
    q: `'${outputFolderId}' in parents and name='${fecha}' and mimeType='application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
  });

  if (fechaSearch.data.files.length > 0) {
    fechaFolderId = fechaSearch.data.files[0].id;
    console.log(`📂 Subcarpeta ${fecha} encontrada con ID: ${fechaFolderId}`);
  } else {
    const fechaCreate = await drive.files.create({
      requestBody: {
        name: fecha,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [outputFolderId],
      },
      fields: 'id',
    });
    fechaFolderId = fechaCreate.data.id;
    console.log(`📂 Subcarpeta ${fecha} creada con ID: ${fechaFolderId}`);
  }

  const excelPath = path.join(__dirname, 'downloads', nombreArchivo);
  console.log(`📄 Buscando archivo Excel: ${excelPath}`);
  if (!fs.existsSync(excelPath)) {
    console.error(`❌ No existe el archivo: ${excelPath}`);
    process.exit(1);
  }

  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  console.log(`📊 Total de filas encontradas: ${data.length}`);

  for (const [index, fila] of data.entries()) {
    console.log(`➡️ Procesando fila ${index + 1}:`, fila);
    const keyProcesado = Object.keys(fila).find(k => k.toLowerCase().trim() === 'procesado');
    const estaProcesado = keyProcesado && fila[keyProcesado]?.toLowerCase().trim() === 'si';

    if (estaProcesado) {
      const destinatario = fila.DESTINATARIO || 'SinNombre';
      const baseName = path.parse(nombreArchivo).name;
      const nombreDoc = `${baseName}_${destinatario}.docx`;

      try {
        const contenido = await generarContenidoIA(fila, process.env.GROQ_API_KEY);

        const doc = new Document({
          sections: [
            {
              children: [
                new Paragraph({
                  children: [new TextRun(contenido)],
                }),
              ],
            },
          ],
        });

        const buffer = await Packer.toBuffer(doc);

        await drive.files.create({
          requestBody: {
            name: nombreDoc,
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            parents: [fechaFolderId],
          },
          media: {
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            body: Buffer.from(buffer),
          },
        });

        console.log(`✅ DOCX generado y subido: ${nombreDoc}`);
      } catch (err) {
        console.error(`❌ Error procesando fila ${index + 1}:`, err.message);
      }
    } else {
      console.log(`⏭️ Fila ${index + 1} omitida (Procesado ≠ 'si')`);
    }
  }

  console.log('✅ Proceso finalizado.');
}

procesarYSubir();
