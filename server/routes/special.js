// /api/special
const express = require('express');
const db = require('../core/db');

const router = express.Router();

router.get('/', (req, res) => {
  const con = [];
  con['1'] = 1;
  if (req.query.search) {
    con.like = `title like '%${req.query.search}%' or subtitle like '%${req.query.search}%'`;
  }
  con.orderBy = 'addtime desc';
  db.Select('xx_special', con, (err, response) => {
    res.send(response);
  });
});

router.get('/:id', (req, res) => {
  const con = [];
  con.id = parseInt(req.params.id, 10);
  db.Select('xx_special', con, (err, response) => {
    res.send(response[0]);
  });
});

router.post('/', (req, res) => {
  const insertData = [];
  insertData.title = req.body.title;
  insertData.subtitle = req.body.subtitle;
  insertData.color = req.body.color;
  insertData.img = req.body.img;
  insertData.addtime = Date.parse(new Date()) / 1000;
  insertData.updatetime = insertData.addtime;
  insertData.content = escape(req.body.content);
  insertData.type = req.body.type;
  insertData.sort = req.body.sort;
  insertData.state = req.body.state;
  db.Insert('xx_special', insertData, (err, response) => {
    res.send(response);
  });
});

router.put('/:id', (req, res) => {
  const updateData = [];
  const con = [];
  con.id = parseInt(req.params.id, 10);
  updateData.title = req.body.title;
  updateData.subtitle = req.body.subtitle;
  updateData.color = req.body.color;
  updateData.img = req.body.img;
  updateData.updatetime = Date.parse(new Date()) / 1000;
  updateData.content = escape(req.body.content);
  updateData.type = req.body.type;
  updateData.sort = req.body.sort;
  updateData.state = req.body.state;
  db.Update('xx_special', updateData, con, (err, response) => {
    res.send(response);
  });
});

router.delete('/:id', (req, res) => {
  const con = [];
  con.id = parseInt(req.params.id, 10);
  db.Delete('xx_special', con, (err, response) => {
    res.send(response);
  });
});

module.exports = router;
