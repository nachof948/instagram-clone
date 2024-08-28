import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage} from "../components/ui/avatar"
import { AlignJustify, Heart, Home, MessageCircle, MonitorPlay, Plus, PlusSquare, Search, TrendingUp } from "lucide-react"
import Logo from '../../public/Logo del formulario.png'
import * as api from '../api/index'
import axios from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { ISideBarItem } from "../types"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"
import { setAuthUser} from "../redux/authSlice"
import { CreatePost } from "./CreatePost"


const LeftSideBar: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth);
  const [text, setText] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const sideBarItems: ISideBarItem[] = [
    {icon:<Home/>, text:'Inicio'},
    {icon:<Search/>, text:'Buscar'},
    {icon:<TrendingUp/>, text:'Explorar'},
    {icon:<MonitorPlay/>, text:'Reels'},
    {icon:<MessageCircle/>, text:'Mensajes'},
    {icon:<Heart/>, text:'Notificaciones'},
    {icon:<PlusSquare />, text:'Crear'},
    {
      icon:(
        <Avatar className="w-6 h-6" >
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text:'Perfil'
    },
  ]

  const handleLogOut = async () =>{
    try {
      const {data} = await api.logout();
      if(data.success){
        dispatch(setAuthUser(null))
        navigate('/login')
        toast.success(data.message)
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message);
      }
    }
  }


  const sideBarHandle = (textType: string) =>{
    setText(textType)
    if(textType === 'Crear'){
      setOpen(true);
    }
  }

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-light-grey w-[17.5%] h-screen flex flex-col">
      <div className="flex flex-col mt-10 flex-1">
        <img src={Logo} alt="Logo de Instagram" className="w-[7rem] relative left-3"/>
        <div className="mt-6">
        {sideBarItems.map((item, index) =>(
          <div onClick={() => sideBarHandle(item.text)} className="flex items-center gap-3 relative cursor-pointer rounded-lg p-3 my-2 transition-all duration-300 hover:bg-light-grey-hover" key={index}>
            {item.icon}
            <span className={`${text === item.text ? 'font-bold' : ''}`}>{item.text}</span>
            </div>
        ))}
        </div>
        <div 
          onClick={handleLogOut}
          className="flex items-center gap-3 p-3 relative mt-auto cursor-pointer rounded-lg mb-4 transition-all duration-300 hover:bg-light-grey-hover">
          <AlignJustify />
          <span>Más</span>
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  )
}

export { LeftSideBar }
