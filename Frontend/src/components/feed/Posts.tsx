import { useSelector } from 'react-redux'
import { Post } from '../feed/Post'
import { RootState } from '../../redux/store'
const Posts: React.FC = () => {
  const { posts } = useSelector((state: RootState) => state.posts)
  return (
    <div>
      {posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  )
}

export { Posts }
