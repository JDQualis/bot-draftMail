const axios = require('axios');

async function generarContenidoIA(fila, apiKey) {
  if (!apiKey) {
    throw new Error("GROQ_API_KEY no fue proporcionada.");
  }

  const nombre = fila.DESTINATARIO || `${fila.Nombre || ''} ${fila.Apellido || ''}`.trim() || 'Estimado/a';
  const empresa = fila.EMPRESA || 'Empresa sin nombre';
  const cargo = fila.Cargo || 'Cargo no especificado';
  const tipo = fila.TIPO || 'N/A';
  const detalle = fila.DETALLE || 'Sin detalle';

  const prompt = `
Generá un cuerpo de correo electrónico breve, claro y profesional, dirigido a la persona llamada "${nombre}", quien ocupa el cargo de "${cargo}".

Usá un tono cordial y directo. Este correo es parte de un proceso automatizado de comunicación y puede incluir solicitudes, información o seguimiento de tareas, según los siguientes datos:

Empresa: ${empresa}
Tipo: ${tipo}
Detalle: ${detalle}

Escribí solo el cuerpo del correo, sin asunto ni encabezados técnicos. Iniciá con un saludo y cerrá con una firma genérica como: "Saludos cordiales".

Importante:
- No uses lenguaje robótico ni plantillas repetitivas.
- Mantené un tono humano, como si un profesional lo hubiera escrito personalmente.
`.trim();

  console.log('🧠 Prompt generado para IA:\n', prompt);

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content.trim();
}

module.exports = generarContenidoIA;
