import { useState, useEffect, useRef } from "react";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../../components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FaRegHeart } from "react-icons/fa";
import { CommentDialog } from "../CommentDialog";

const Post: React.FC = () => {
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

  return (
    <div className="my-8 w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>Username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <Button variant="ghost" className="cursor-pointer mx-auto w-fit text-[#ED4956] font-bold">
              Dejar de seguir
            </Button>
            <Button variant="ghost" className="cursor-pointer mx-auto w-fit">
              Agregar a favoritos
            </Button>
            <Button variant="ghost" className="cursor-pointer mx-auto w-fit">
              Cancelar
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src="https://images.unsplash.com/photo-1724250267252-247d7691a1ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="post_img"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaRegHeart size={'22px'} className="cursor-pointer hover:text-grey" />
          <MessageCircle onClick={() => setOpen(true)} className="cursor-pointer hover:text-grey" />
          <Send className="cursor-pointer hover:text-grey" />
        </div>
        <Bookmark className="cursor-pointer hover:text-grey" />
      </div>
      <span className="font-medium block mb-2">1k Me gusta</span>
      <p>
        <span className="font-medium mr-2">username</span>
        caption
      </p>
      <span className="cursor-pointer text-sm text-grey" onClick={() => setOpen(true)}>
        Ver los 53 comentarios
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
        {text.length > 0 && <span className="text-light-blue font-medium">Publicar</span>}
      </div>
    </div>
  );
};

export { Post };
