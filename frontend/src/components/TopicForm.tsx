import { FormEventHandler } from "react"

const PostForm = () => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const title = form.get('title') || 'このメッセージは見えないはずだよ'
    fetch(`http://localhost:3000/topic/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title
      })
    }).then((res) => {
      if(res.status === 200) {
        window.location.reload()
      }
    })
  }

  return (
    <>
      <h3 style={{marginTop: '32px'}}>新規スレ作成</h3>
      <form onSubmit={onSubmit}>
        名前:
        <input type="text" name="title" defaultValue="スレタイトル" /><br />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default PostForm
