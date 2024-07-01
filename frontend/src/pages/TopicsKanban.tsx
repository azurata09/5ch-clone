import { useEffect, useState } from "react"
import { Topic } from "../types"
import TopicForm from "../components/TopicForm"
import { Link } from "react-router-dom"

type Response = {
  topics: Topic[]
}

const TopicsKanban = () => {
  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    fetch(`http://localhost:3000/topics/`)
    .then(res => res.json())
    .then((data: Response) => {
      setTopics(data.topics)
    })
  })

  return (
    <>
      <h1>スレ一覧</h1>
      <ul>
        {topics.map((topic) =>
          <li key={topic.id}><Link to={`/topic/${topic.id}`}>{topic.title}</Link></li>
        )}
      </ul>
      <TopicForm />
    </>
  )
}

export default TopicsKanban
