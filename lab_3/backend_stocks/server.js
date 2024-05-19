const express = require('express');

const stocks = require('./internal/stocks');

const app = express();
const path = require('path');

const host = 'localhost';
const port = 8000;

app.use(express.json());

app.use('/stocks', stocks);

// Указываем Express обслуживать статические файлы из директории 'public'
app.use(express.static(path.join(__dirname, 'frontend_stocks')));

app.listen(port, host, () => {
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
});

// app.use(express.json()) - это middleware, который позволяет обрабатывать JSON-запросы.
// она добавляет к объекту запроса req поле body, в котором хранится тело запроса в виде объекта.
// это позволяет обрабатывать JSON-запросы, например, при создании новой записи в базе данных.
// мидлвары - это функции, которые выполняются перед обработкой запроса