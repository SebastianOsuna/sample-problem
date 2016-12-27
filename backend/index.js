'use strict';

const http = require('http');
const express = require('express');

const parse = require('./lib/Parser');
const TestCase = require('./lib/TestCase');

const app = express();
app.use(require('body-parser').json());
app.use(express.static(`${__dirname}/public`));

app.post('/', function (req, res) {
  const input = req.body.input;
  try {
    const result = parse(input);
    var response = '';
    const handler = str => response += `${str}\n`;

    result.cases.forEach(c => {
      c.handler = handler;
      new TestCase(c).run();
    });

    res.send({ result: response });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

const server = http.createServer(app);
const port = process.env.PORT || 3000
server.listen(port, err => {
  if (!err) {
    console.log(`Listening on port ${port}`);
  }
});
