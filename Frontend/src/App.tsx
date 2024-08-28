import './App.css'
import { Login } from './components/Login'
import { UserProfile } from './components/UserProfile'
import { MainLayout } from './layout/MainLayout'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children:[
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/profile',
      element: <UserProfile />
    }
  ]
  },
  {
    path:'/signup',
    element: <SignUp />
  },
  {
    path:'/login',
    element: <Login />
  }
])

function App() {

  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
