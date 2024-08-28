import { Post } from '../feed/Post'
const Posts: React.FC = () => {
  return (
    <div>
      {[1,2,3,4].map((item, index) => <Post key={index}/>)}
    </div>
  )
}

export { Posts }
