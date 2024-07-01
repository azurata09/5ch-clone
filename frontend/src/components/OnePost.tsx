import { Post } from "../types";

const OnePost = (props: {post: Post, index: number}) => {
  return (
    <div className={'OnePost'} style={{
      border: '1px solid black',
      margin: '8px',
      padding: '8px',
      borderRadius: '8px'
    }}>
      <p>
        {props.index.toString().padStart(4, '0')} <b>{props.post.poster}</b> {props.post.created_at}
      </p>
      <p style={{marginTop: '16px'}}>{props.post.content}</p>
    </div>
  )
}

export default OnePost
