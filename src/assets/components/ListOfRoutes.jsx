import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Articlepage from "./Articlepage";
import UserPage from "../../Userpage";
import ProfilePage from "./ProfilePage";

function ListOfRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:articles_id" element={<Articlepage />} />
      <Route path="/user" element={<UserPage />} />
      <Route
        path="/profile"
        element={<ProfilePage loggedInUsername="butter_bridge" />}
      />{" "}
      {/* Replace with dynamic user when can get it to load the correct details.*/}
    </Routes>
  );
}

export default ListOfRoutes;
