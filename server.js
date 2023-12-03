const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const nomeArquivo = 'lista-de-medicamentos-similares-intercambiaveis.json';

app.get('/api/data', (req, res) => {
  const filePath = path.join(__dirname, nomeArquivo);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Erro ao ler o arquivo: ${err}`);
      return res.status(500).json({ error: 'Erro ao ler o arquivo' });
    }

    try {
      const jsonData = JSON.parse(data);
      
      const filteredData = jsonData.filter(item => item.Column1 !== "Lista de Medicamentos Similares e seus respectivos medicamentos de referência, conforme RDC 58/2014 Atualizada até 11/05/2020, conforme o Diário Oficial da União. Lista de Medicamentos Similares classificada por ordem alfabética do medicamento de referência");
      res.json(filteredData);
    } catch (jsonError) {
      console.error('Erro ao analisar o JSON:', jsonError);
      res.status(500).json({ error: 'Erro ao analisar o JSON' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
