const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.send('pong')
})

// スレ一覧
app.get('/topics/', (req, res) => {
  throw Error('No implementation yet');
})

// レス一覧
app.get('/topic/:id/posts/', (req, res) => {
  throw Error('No implementation yet');
})

// レスする
app.post('/topic/:id/post/', (req, res) => {
  throw Error('No implementation yet');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
