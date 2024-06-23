import express from 'express'
import cors from 'cors'
import sqlite from 'sqlite3'
import { topicsDummyData, postsDummyData, Post } from './types'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const topicIdNotFountMessage = (id: number) => ({
  message: "Topic id " + id + " is not found.",
  jaMessage: id + "というトピックIDは存在しません。"
})

const db = new sqlite.Database('./data/data.db', (err) => {
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
  return res.send('pong')
})

// スレ一覧, Done
app.get('/topics/', (req, res) => {
  // トピック一覧を取得して返す
  db.all('SELECT * FROM topics;', (err, rows) => {
    if(err) console.error(err)

    return res.send({
      topics: rows
    })
  })
})

// 板作成, Done
app.post('/topic/', (req, res) => {
  // 投稿内容を解釈してデータベースに格納 (今はダミーデータ)
  type RequestBody = {
    title: string
  }

  // いずれかの必須プロパティがbodyにない場合、リクエスト不正で返す
  if(!req.body.title) {
    return res.status(400).send({
      message: 'Bad request body.',
      jaMessage: 'リクエスト内容が不正です。'
    })
  }

  const body: RequestBody = req.body

  db.run(`INSERT INTO topics(title) VALUES("${body.title}");`, (err) => {
    if(err) {
      console.error(err)
      return res.status(500).send({
        message: 'Internal Server Error.',
        jaMessage: 'サーバー内エラーが起きました。'
      })
    }

    db.get<{ id: number }>(`SELECT id FROM topics WHERE title = "${body.title}" ORDER BY created_at DESC`, (err, rows) => {
      if(err) {
        console.error(err)
        return res.status(500).send({
          message: 'Internal Server Error.',
          jaMessage: 'サーバー内エラーが起きました。'
        })
      }

      // 問題ないならトピックIDを返す (200と一緒に)
      return res.status(200).send({
        id: rows.id
      })
    })
  })
})

// レス一覧
app.get('/topic/:id/posts/', (req, res) => {
  const id: number = parseInt(req.params.id)

  // 指定されたトピックがない場合、エラーを返す
  db.get<{ title: string }>(`SELECT title FROM topics WHERE id = ${id};`, (err, row) => {
    if(err) {
      console.error(err)
      return res.status(500).send({
        message: 'Internal Server Error.',
        jaMessage: 'サーバー内エラーが起きました。'
      })
    }

    if(!row.title) {
      return res.status(400).send(topicIdNotFountMessage(id))
    }

    // 投稿一覧を取得して返す (今はダミーデータ)
    db.all<Post[]>(`SELECT * FROM posts WHERE topic_id = ${id}`, (err, rows) => {
      return res.send({
        topic_title: row.title,
        messages: rows
      })
    })
  })
})

// レスする
app.post('/topic/:id/post/', (req, res) => {
  // 指定されたトピックがない場合、エラーを返す
  const id: number = parseInt(req.params.id)

  db.get<{ title: string }[]>(`SELECT COUNT(*) FROM topics WHERE id == ${id};`, (err, rows) => {
    if(err) {
      console.error(err)
      return res.status(500).send({
        message: 'Internal Server Error.',
        jaMessage: 'サーバー内エラーが起きました。'
      })
    }

    if(0 < rows.length) {
      return res.status(400).send(topicIdNotFountMessage(id))
    }

    // 投稿内容を解釈してデータベースに格納
    type RequestBody = {
      poster: string
      content: string
    }

    // いずれかのプロパティがbodyにない場合
    if(!req.body.poster || !req.body.content) {
      return res.status(400).send({
        message: 'Bad request body.',
        jaMessage: 'リクエスト内容が不正です。'
      })
    }

    // 問題ないなら何も返さない (200を返す)
    const body: RequestBody = req.body
    db.run(`INSERT INTO posts(topic_id, poster, content) values(${id}, ${body.poster}, ${body.content});`)
    return res.status(200)
  })
})

app.listen(port, () => {
  console.log(`ポート${port}番で動作中。`)
})
