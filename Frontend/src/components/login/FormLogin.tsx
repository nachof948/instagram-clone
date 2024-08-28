import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { IoLogoFacebook } from "react-icons/io";
import Logo from '../../../public/Logo del formulario.png'
import { useState, ChangeEvent, FormEvent } from "react";
import { IFormData } from "../../types";
import { toast } from "sonner";
import * as api from '../../api/index'
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../redux/authSlice";

const FormLogin: React.FC = () =>{
  const [formData, setFormData] = useState<IFormData>({
    email:'',
    password:''
  }) 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try {
      const { data } = await api.login(formData);
      if(data.success){
        dispatch(setAuthUser(data.user))
        navigate('/')
        toast.success(data.message)
        setFormData({
          email:'',
          password:''
        })
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message)
      }else{
        toast.error('Error desconocido')
      }
    }
  }

  return(
  <form className="flex-col gap-5 p-8 w-[350px] border border-light-grey" onSubmit={handleSubmitForm}>
    <div className="my-4 text-center flex flex-col gap-3 items-center ">
      <img src={Logo} alt="Logo de Instagram" className="w-[10.5rem]" />
      <p className="text-grey font-semibold text-base">Iniciar Sesión para ver fotos y videos de tus amigos.</p>
      <Button className="bg-light-blue w-full text-white text-sm hover:bg-hover-signup" size={"buttonSignUp"}><span className="text-2xl mx-2"><IoLogoFacebook /></span>Iniciar sesión con Facebook</Button>
    </div>
    <div className="flex items-center gap-3">
      <div className="h-[1px] w-full bg-light-grey"></div>
      <p className="font-medium text-grey text-sm">O</p>
      <div className="h-[1px] w-full bg-light-grey"></div>
    </div>
    <div>
      <Input 
      type="text"
      name="email"
      placeholder="Numero telefonico o Correo electrónico"
      className="focus-visible:ring-transparent my-2 bg-grey-input rounded-sm border-light-grey"
      onChange={handleChange}
      />
      <Input 
      type="password"
      name="password"
      placeholder="Contraseña"
      className="focus-visible:ring-transparent my-2 bg-grey-input rounded-sm border-light-grey"
      onChange={handleChange}
      />
    </div>
    <div className="flex gap-3 flex-col items-center text-center text-xs text-grey">
      <p>Es posible que las personas que usan nuestro servicio hayan subido tu información de contacto a Instagram. <span className="text-link-blue cursor-pointer">Más información</span></p>
      <p>Al registrarte, aceptas nuestras <span className="text-link-blue cursor-pointer">Condiciones</span>, la <span className="text-link-blue cursor-pointer">Política de privacidad</span> y la <span className="text-link-blue cursor-pointer">Política de cookies.</span></p>
    </div>
    <Button type="submit" className="bg-light-blue w-full text-white text-sm mt-4 opacity-45 hover:bg-hover-signup" size={"buttonSignUp"} >Iniciar Sesión</Button>
  </form>
  )
}
export { FormLogin }