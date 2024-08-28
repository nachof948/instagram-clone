import { useEffect, useRef, useState } from "react";
import { FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "../utils/readFileAsDataURL";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import * as api from '../api/index'


interface CreatePostProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ open, setOpen }) => {
  const [file, setFile] = useState<File | null>()
  const [caption, setCaption] = useState<string>("")
  const [imagePreview, setImagePreview] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const fileChangeHandle = async (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if(file){
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl)
    }
  }

  const handleFileInput = () =>{
    if(inputRef.current){
      inputRef.current.click()
    }
  }

  const handleCreatePost = async (e: FormEvent) =>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("caption", caption)
    if(file) formData.append("image", file)
    try {
      setLoading(true);
      const { data } = await api.addPost(formData)
      if(data.success){
        toast.success(data.message)
        setOpen(false)
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message)
      }
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(() =>{
    if(open === false){
      setCaption('')
      setImagePreview('')
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="font-medium mx-auto">Crea una nueva publicación</DialogHeader>
        <div className="flex gap-3 items-center" onClick={handleCreatePost}>
          <Avatar>
            <AvatarImage src="" alt="img"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="">
            <h1 className="font-semibold text-xs">Nombre de Usuario</h1>
            <span className="text-grey text-xs">Bio here...</span>
          </div>
        </div>
        <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none resize-none" placeholder="Escribe un titulo"/>
        {
          imagePreview && (
            <div className="w-full h-64 flex items-center justify-center">
              <img src={imagePreview} alt="img" className="rounded-sm my-6 h-full w-full object-cover" />
            </div>
          )
        }
        <input ref={inputRef} type="file" className="hidden" onChange={fileChangeHandle} />
        <Button className="w-fit mt-2 mx-auto bg-light-blue text-white hover:bg-hover-signup" onClick={handleFileInput}>Seleccionar de la computadora</Button>
        {
          imagePreview && (
            loading ? (
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin bg-hover-signup text-white"/>
                Por favor aguarde
              </Button>
            ) : (
              <Button onClick={handleCreatePost} className="w-full bg-hover-signup text-white">Publicar</Button>
            )
          )
        }
      </DialogContent>
    </Dialog>
  );
};

export { CreatePost };
