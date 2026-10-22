const http = require('http');

function handler(req, res) {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(
      '<h1>Hello from the CI/CD pipeline!</h1>' +
      '<p>This Node.js app is built, tested and pushed to Docker Hub by GitHub Actions.</p>'
    );
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
}

function createServer() {
  return http.createServer(handler);
}

module.exports = { createServer };
