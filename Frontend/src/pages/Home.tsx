import { Outlet } from "react-router-dom"
import { Feed } from "../components/Feed"
import { RightSideBar } from "../components/RightSideBar"

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSideBar />
    </div>
  )
}

export { Home }
