import { useState, useEffect, useRef } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent } from "./ui/dialog";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

interface CommentDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommentDialog: React.FC<CommentDialogProps> = ({ open, setOpen }) => {
  
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Resetea la altura para calcular el tamaño
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta la altura al contenido
    }
  }, [text]);


    useEffect(() => {
      if (!open) {
        setText("");
      }
    }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };


  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-3xl lg:max-w-5xl p-0 flex flex-col"
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1724250267252-247d7691a1ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="post_img"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link to={"/"}>
                  <Avatar>
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="">
                  <Link to={"/"} className="font-semibold text-xs">
                    username
                  </Link>
                  {/* <span className="text-grey text-sm">Bio here...</span> */}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent>
                  <div className="cursor-pointer w-full text-center text-[#ED4956] font-bold border-b border-grey pb-2">
                    Dejar de seguir
                  </div>
                  <div className="cursor-pointer w-full text-center border-b border-grey pb-2">
                    Agregar a favoritos
                  </div>
                  <div className="cursor-pointer w-full text-center">
                    Cancelar
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr className="text-light-grey" />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              Comments ayenge
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <textarea
                  ref={textareaRef}
                  onChange={handleChange}
                  value={text}
                  style={{ overflow: "hidden" }}
                  placeholder="Agregar un comentario..."
                  className="outline-none text-sm w-full resize-none border-b border-b-light-grey"
                />
                <Button disabled={text.length === 0} className={`text-light-blue font-medium cursor-pointer`}>Publicar</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { CommentDialog };
