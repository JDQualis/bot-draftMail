const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const { google } = require('googleapis');
const { Readable } = require('stream');

const FOLDER_ID = '1ZGFBJKuNcqDY59RQNh8rxR5Jm8emBgg_';
const nombreArchivo = process.env.nombreArchivo || 'La_Caja.xlsx';

async function procesarYSubir() {
  // Auth con Google
  const auth = new google.auth.GoogleAuth({
    keyFile: 'service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  const excelPath = path.join(__dirname, 'downloads', nombreArchivo);
  if (!fs.existsSync(excelPath)) {
    console.error(`❌ No existe el archivo: ${excelPath}`);
    process.exit(1);
  }

  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  console.log(`📊 Total de filas leídas: ${data.length}`);

  const outputPath = path.join(__dirname, 'output');
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  let procesados = 0;
  let index = 1;

  for (const fila of data) {
    console.log('📄 Fila:', fila);

    const estadoRaw = fila?.Procesado ?? '';
    const estado = estadoRaw
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

    if (estado === 'si') {
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [new TextRun("HOLA, FUNCIONO")],
              }),
            ],
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      const nombreDoc = `salida_${index++}.docx`;

      // Guardar local
      fs.writeFileSync(path.join(outputPath, nombreDoc), buffer);
      console.log(`💾 Guardado localmente: ${nombreDoc}`);

      // Subir a Drive
      await drive.files.create({
        requestBody: {
          name: nombreDoc,
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          parents: [FOLDER_ID],
        },
        media: {
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          body: Readable.from(buffer),
        },
      });

      console.log(`📤 Subido a Drive: ${nombreDoc}`);
      procesados++;
    }
  }

  if (procesados === 0) {
    console.warn('⚠️ No se encontró ninguna fila con "Procesado = si"');
  } else {
    console.log(`✅ Total de archivos generados y subidos: ${procesados}`);
  }
}

procesarYSubir();
