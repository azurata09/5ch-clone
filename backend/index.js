const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const sqlite = require('sqlite3')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new sqlite.Database('./dist/data.db', (err) => {
  if(err) {
    console.error(err)
    throw Error('データベースが開けませんでした')
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS topics(
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );`)

  db.run(`
    CREATE TABLE IF NOT EXISTS posts(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_id TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      poster TEXT DEFAULT "名無し",
      content TEXT NOT NULL
    );`)
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

// スレ一覧
app.get('/topics/', (req, res) => {
  // トピック一覧を取得して返す (今はダミーデータ)

  res.json({
    topics: [
      {id: 0, title: 'ほげ', created_at: '2024-04-01 00:00:01'},
      {id: 1, title: 'ふが', created_at: '2024-04-01 00:01:00'},
      {id: 2, title: 'ぴよ', created_at: '2024-04-01 01:00:00'},
    ]
  })
})

// 板作成
app.post('/topic/', (req, res) => {
  // 投稿内容を解釈してデータベースに格納 (今はダミーデータ)

  // 問題ないなら何も返さない (200を返す)
  res.sendStatus(200);
  res.send();
})

// レス一覧
app.get('/topic/:id/posts/', (req, res) => {
  // 指定されたトピックがない場合、エラーを返す
  if(false) {
    res.status(500)
    res.json({
      message: "Topic id " + req.params.id + " is not found.",
      jaMessage: req.params.id + "というトピックIDは存在しません。"
    })
  }

  // 投稿一覧を取得して返す (今はダミーデータ)
  res.json({
    topic: {
      title: 'foo'
    },
    messages: [
      {id: 0, created_at: '2024-04-01 00:00:01', poster: 'ほげ', content: "ほげふが"},
      {id: 1, created_at: '2024-04-01 00:00:02', poster: 'ふが', content: "ふがぴよ"},
      {id: 2, created_at: '2024-04-01 00:00:03', poster: 'ぴよ', content: "ぴよほげ"},
    ]
  })
})

// レスする
app.post('/topic/:id/post/', (req, res) => {
  // 指定されたトピックがない場合、エラーを返す
  if(false) {
    res.status(500)
    res.json({
      message: "Topic id " + req.params.id + " is not found.",
      jaMessage: req.params.id + "というトピックIDは存在しません。"
    })
  }

  // 投稿内容を解釈してデータベースに格納 (今はダミーデータ)

  // エラーならエラーを返す

  // 問題ないなら何も返さない (200を返す)
  res.status(200)
})

app.listen(port, () => {
  console.log(`ポート${port}番で動作中。`)
})
