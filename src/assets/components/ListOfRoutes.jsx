import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Articlepage from "./Articlepage";
import UserPage from "../../Userpage";
import ProfilePage from "./ProfilePage";
import CookingArticles from "./CookingArticles";
import FootballArticles from "./FootballArticles";
import CodingArticles from "./CodingArticles";
function ListOfRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:articles_id" element={<Articlepage />} />
      <Route path="/user" element={<UserPage />} />
      <Route
        path="/profile"
        element={<ProfilePage loggedInUsername="butter_bridge" />}
      />
      <Route path="/cooking" element={<CookingArticles />} />
      <Route path="/Football" element={<FootballArticles />} />
      <Route path="/Coding" element={<CodingArticles />} />
    </Routes>
  );
}

export default ListOfRoutes;
