import { Outlet } from "react-router-dom";
import { Feed } from "../components/Feed";
import { RightSideBar } from "../components/RightSideBar";
import { userGetAllPost } from "../hooks/userGetAllPost";

const Home = () => {
    userGetAllPost(); 
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSideBar />
    </div>
  );
};

export { Home };
