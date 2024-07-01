import { FormEventHandler } from "react"

const PostForm = (props: {topicId: number}) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const poster = form.get('poster') || '名無し'
    const content = form.get('content') || ''
    fetch(`http://localhost:3000/topic/${props.topicId}/post/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poster, content
      })
    }).then((res) => {
      if(res.status === 200) {
        window.location.reload()
      }
    })
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        名前:
        <input type="text" name="poster" defaultValue="名無し" /><br />
        <textarea name="content" style={{
          width: '100%',
          height: '100px',
          resize: 'none'
        }}></textarea><br />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default PostForm
