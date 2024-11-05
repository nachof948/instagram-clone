import { useState, useEffect, useRef } from "react";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FaRegHeart } from "react-icons/fa";
import { CommentDialog } from "../CommentDialog";
import { IPost } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { deletePost } from "../../api";
import { toast } from "sonner";
import { deleteUserPost } from "../../redux/postSlice";
import axios from "axios";

interface PostPros {
  post: IPost;
}

const Post: React.FC<PostPros> = ({ post }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth);
  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Resetea la altura para calcular el tamaño
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta la altura al contenido
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  const handleDeletePost = async () => {
    if (!post?._id) {
      // Manejar el caso en el que user?._id es undefined
      toast.error("No se puede eliminar el post.");
      return;
    }
    try {
      const { data } = await deletePost(post._id); // user._id es seguro aquí
      console.log(data)
      if (data.success) {
        dispatch(deleteUserPost(post._id))
        toast.success(data.message);
        setOpen(false)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };
  

  return (
    <div className="my-8 w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_image" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <h1>{post.author?.username}</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <Button
              variant="ghost"
              className="cursor-pointer mx-auto w-fit text-[#ED4956] font-bold"
            >
              Dejar de seguir
            </Button>
            <Button variant="ghost" className="cursor-pointer mx-auto w-fit">
              Agregar a favoritos
            </Button>
            {user?._id === post.author?._id && (
              <Button variant="ghost" className="cursor-pointer mx-auto w-fit" onClick={handleDeletePost}>
                Eliminar
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={post?.image}
        alt="post_img"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaRegHeart
            size={"22px"}
            className="cursor-pointer hover:text-grey"
          />
          <MessageCircle
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-grey"
          />
          <Send className="cursor-pointer hover:text-grey" />
        </div>
        <Bookmark className="cursor-pointer hover:text-grey" />
      </div>
      <span className="font-medium block mb-2">
        {post.likes?.length} Me gusta
      </span>
      <p>
        <span className="font-medium mr-2">{post.author?.username}</span>
        {post?.caption}
      </p>
      <span
        className="cursor-pointer text-sm text-grey"
        onClick={() => setOpen(true)}
      >
        Ver los 69 comentarios
      </span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between mt-2">
        <textarea
          ref={textareaRef}
          onChange={handleChange}
          value={text}
          style={{ overflow: "hidden" }}
          placeholder="Agregar un comentario..."
          className="outline-none text-sm w-full resize-none border-b border-b-light-grey"
        />
        {text.length > 0 && (
          <span className="text-light-blue font-medium">Publicar</span>
        )}
      </div>
    </div>
  );
};

export { Post };
