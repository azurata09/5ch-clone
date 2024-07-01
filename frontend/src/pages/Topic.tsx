import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Post } from "../types"
import OnePost from "../components/OnePost"
import PostForm from "../components/PostForm"

type Response = {
    topic_title: string
    messages: {
      id: number
      topic_id: number
      created_at: string
      poster: string
      content: string
    }[]
}

const Topic = () => {
  const params = useParams<{ id: string }>()
  const [title, setTitle] = useState<string>('')
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch(`http://localhost:3000/topic/${params.id}/posts/`)
      .then(res => res.json())
      .then((data: Response) => {
        setTitle(data.topic_title)
        setPosts(data.messages.map(record => ({
          id: record.id,
          created_at: record.created_at,
          poster: record.poster,
          content: record.content
        })))
      })
  }, [])

  return (
    <>
      <h1 style={{ margin: '32px 0' }}>スレ名: {title}</h1>
      {posts.map((post, index) => <OnePost key={post.id} post={post} index={index} />)}
      <PostForm topicId={parseInt(params.id!)} />
    </>
  )
}

export default Topic
