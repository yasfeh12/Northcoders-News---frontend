import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Articlepage from "./Articlepage";
import UserPage from "../../Userpage";
import ProfilePage from "./ProfilePage";
import CookingArticles from "./CookingArticles";
import FootballArticles from "./FootballArticles";
import CodingArticles from "./CodingArticles";
import Loginpage from "./Loginpage";
import NotFound from "./Notfound";
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
      <Route path="/login" element={<Loginpage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ListOfRoutes;
