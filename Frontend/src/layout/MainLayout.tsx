import { Outlet } from "react-router-dom"
import { LeftSideBar } from "../components/LeftSideBar"


const MainLayout = () => {
  return (
    <div>
      <LeftSideBar />
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export { MainLayout }
