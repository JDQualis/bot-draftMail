const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const { google } = require('googleapis');

const FOLDER_ID = '1ZGFBJKuNcqDY59RQNh8rxR5Jm8emBgg_';
const nombreArchivo = process.env.nombreArchivo || 'La_Caja.xlsx';

async function procesarYSubir() {
  // Autenticación con Google
  const auth = new google.auth.GoogleAuth({
    keyFile: 'service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  // Leer Excel local
  const excelPath = path.join(__dirname, 'downloads', nombreArchivo);
  if (!fs.existsSync(excelPath)) {
    console.error(`❌ No existe el archivo: ${excelPath}`);
    process.exit(1);
  }

  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  let index = 1;
  for (const fila of data) {
    if (fila.PROCESADOS?.toLowerCase() === 'si') {
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

      // Subir a Google Drive en la misma carpeta
      await drive.files.create({
        requestBody: {
          name: nombreDoc,
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          parents: [FOLDER_ID],
        },
        media: {
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          body: Buffer.from(buffer),
        },
      });

      console.log(`📤 Subido: ${nombreDoc}`);
    }
  }
}

procesarYSubir();
