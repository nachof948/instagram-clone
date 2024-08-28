import { Link } from 'react-router-dom'
import linksForm from '../data/linksForm.json'
import { FormLogin } from './login/FormLogin'

const Login: React.FC = () =>{
  return(
    <main className="flex flex-col items-center w-screen h-screen justify-start mt-3">
      <FormLogin />
      <div className="flex justify-center items-center gap-1 mt-4 border border-light-grey py-6 w-[350px] text-sm">
        <p>¿No tienes una cuenta?</p>
        <Link to={'/signup'} className="text-light-blue font-medium cursor-pointer">Registrarse</Link>
      </div>
      <p className="mt-4 text-sm">Descarga la app.</p>
      <div className="flex items-center gap-2 mt-4">
        <img src="https://static.cdninstagram.com/rsrc.php/v3/yT/r/0BpxdgM3WUr.png" alt="Logo de Google Play" className="w-[8.8rem] h-[40px] object-fill" />
        <img src="https://static.cdninstagram.com/rsrc.php/v3/y9/r/LjIQEL8csb0.png" alt="Logo de Microsoft" className="w-[7.6rem] h-[40px] object-cover" />
      </div>
      <div className="flex gap-4 text-grey text-xs mt-20">
        {linksForm.map((link, index) => (
          <p key={index} className="cursor-pointer">
            {link.name}
          </p>
        ))}
      </div>
      <div className=" flex items-center gap-4 mt-6 pb-8 text-xs text-grey">
        <select>
          <option value="">Español</option>
          <option value="">English</option>
        </select>
        <p>© 2024 Instagram from Meta</p>
      </div>
    </main>
  )
}

export { Login }