const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Получаем имя Pod из переменной окружения Kubernetes
// Kubernetes автоматически ставит переменную HOSTNAME = имя pod'а
const POD_NAME = process.env.HOSTNAME || 'local';

// Главная страница
app.get('/', (req, res) => {
  res.json({
    message: '🍓 Привет от Raspberry Pi!',
    pod: POD_NAME,
    version: 'v1',
    timestamp: new Date().toISOString()
  });
});

// Healthcheck — Kubernetes проверяет этот эндпоинт
// Если он отвечает 200 — pod считается живым
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Показываем информацию о текущем pod'е
app.get('/info', (req, res) => {
  res.json({
    pod: POD_NAME,
    node_version: process.version,
    uptime: Math.floor(process.uptime()) + 's',
    memory: process.memoryUsage()
  });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
  console.log(`📦 Pod name: ${POD_NAME}`);
});