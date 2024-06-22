export type Topic = {
  id: number
  title: string
  created_at: string
}

export const topicsDummyData: Topic[] = [
  {id: 0, title: 'ほげ', created_at: '2024-04-01 00:00:01'},
  {id: 1, title: 'ふが', created_at: '2024-04-01 00:01:00'},
  {id: 2, title: 'ぴよ', created_at: '2024-04-01 01:00:00'}
]

// ----

export type Post = {
  id: number
  created_at: string
  poster: string
  content: string
}

export const postsDummyData: Post[] = [
  {id: 0, created_at: '2024-04-01 00:00:01', poster: 'ほげ', content: "ほげふが"},
  {id: 1, created_at: '2024-04-01 00:00:02', poster: 'ふが', content: "ふがぴよ"},
  {id: 2, created_at: '2024-04-01 00:00:03', poster: 'ぴよ', content: "ぴよほげ"},
]
