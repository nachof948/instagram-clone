import { useEffect } from "react"
import { getAllPost } from "../api"
import { useDispatch} from "react-redux"
import { setPosts } from "../redux/postSlice";



export const userGetAllPost = () =>{
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllPost = async () =>{
            try {
                const { data } = await getAllPost();
                console.log(data);
                if(data.success) {
                    dispatch(setPosts(data.posts))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllPost();
    }, [dispatch]); 
}
