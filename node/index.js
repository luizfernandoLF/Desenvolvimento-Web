const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const {createLink} = require('./links');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const dir = process.argv[2];
const PORT = process.env.PORT ?? 3333;

if (!dir) {
  console.error("Erro: informe o diretório como argumento.");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url);
  if (urlPath === '/') {
    fs.readdir(dir, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
        return res.end('Erro ao ler o diretório: ' + err.message);
      }

      let html = {dir};
      files.forEach(file => {
        html += createLink(file);
      });

      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.end(html);
    });
  } else {
    const filePath = path.join(dir, urlPath);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
        return res.end('Arquivo não encontrado ou erro ao ler.');
      }

      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.write(`<pre>${data}</pre>`);
      res.write(`<br><a href="/">Voltar</a>`);
      res.end();
    });
  }
});

server.listen(PORT, () => {
  console.log(`rodando em http://localhost:${PORT}`);
});
