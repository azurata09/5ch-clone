import express from 'express'
import cors from 'cors'
import sqlite from 'sqlite3'
import { topicsDummyData, postsDummyData } from './types'

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

const existsTopic = (topicId: number): boolean => {
  db.get<{ 'COUNT(*)': number }>(`SELECT COUNT(*) FROM topics WHERE id == ?;`, topicId, (err, row) => {
    if(err) {
      console.error(err)
    }
    return row['COUNT(*)'] > 0
  })
  return false
}

app.get('/ping', (req, res) => {
  return res.send('pong')
})

// スレ一覧
app.get('/topics/', (req, res) => {
  // トピック一覧を取得して返す (今はダミーデータ)
  db.all('SELECT * FROM topics;', (err, rows) => {
    if(err) console.error(err)
    else console.log(rows)
  })

  return res.send({
    topics: topicsDummyData
  })
})

// 板作成
app.post('/topic/', (req, res) => {
  // 投稿内容を解釈してデータベースに格納 (今はダミーデータ)

  // 問題ないなら何も返さない (200を返す)
  return res.status(200)
})

// レス一覧
app.get('/topic/:id/posts/', (req, res) => {
  // 指定されたトピックがない場合、エラーを返す
  const id: number = parseInt(req.params.id)
  const topicExists = existsTopic(id)
  if(!topicExists) {
    return res.status(400).send(topicIdNotFountMessage(id))
  }

  // 投稿一覧を取得して返す (今はダミーデータ)
  return res.send({
    topic_title: 'foo',
    messages: postsDummyData
  })
})

// レスする
app.post('/topic/:id/post/', async (req, res) => {
  // 指定されたトピックがない場合、エラーを返す
  const id: number = parseInt(req.params.id)
  const topicExists = existsTopic(id)
  if(!topicExists) {
    return res.status(400).send(topicIdNotFountMessage(id))
  }

  // 投稿内容を解釈してデータベースに格納
  type RequestBody = {
    poster: string
    content: string
  }

  const body: RequestBody = req.body
  db.run('INSERT INTO posts(topic_id, poster, content) values(?, ?, ?);', id, body.poster, body.content)

  // 問題ないなら何も返さない (200を返す)
  return res.status(200)
})

app.listen(port, () => {
  console.log(`ポート${port}番で動作中。`)
})
