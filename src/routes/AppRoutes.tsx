import { Routes, Route } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CreateProperty from "../pages/CreateProperty/CreateProperty";
import NotFound from "../pages/NotFound/NotFound";
import ProfileLayout from "../pages/Profile/ProfileLayout";
import Overview from "../pages/Profile/Overview";
import Favorites from "../pages/Profile/Favorites";
import MyProperties from "../pages/Profile/MyProperties";
import Messages from "../pages/Profile/Messages";
import Setting from "../pages/Profile/Setting";
import PropPage from "../pages/PropPage/PropPage";
import SearchProp from "../pages/SearchProp/SearchProp";
// import News from "../pages/News/News";
// import NewsMain from "../pages/NewsMain/NewsMain";
// import About from "../pages/About/About";
// import Messages from "../pages/Messages/Messages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<Overview />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="properties" element={<MyProperties />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Setting />} />
      </Route>

      <Route path="/createProperty" element={<CreateProperty />} />
      <Route path="/searchproperty" element={<SearchProp />} />
      {/* <Route path="/news" element={<NewsMain />} />
      <Route path="/news/:newsId" element={<News />} />
      <Route path="/about" element={<About />} />
      <Route path="/messages" element={<Messages />} /> */}
      <Route path="/property/:propId" element={<PropPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
