import { Routes, Route } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CreateProperty from "../pages/CreateProperty/CreateProperty";
import NotFound from "../pages/NotFound/NotFound";
// import Profile from "../pages/Profile/Profile";
// import SearchProp from "../pages/SearchProp/SearchProp";
// import News from "../pages/News/News";
// import NewsMain from "../pages/NewsMain/NewsMain";
// import About from "../pages/About/About";
// import Messages from "../pages/Messages/Messages";
// import PropPage from "../pages/PropPage/PropPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route path="/createProperty" element={<CreateProperty />} />
      {/* <Route
        path="/searchproperty/:city/:type/:contract"
        element={<SearchProp />}
      />
      <Route path="/news" element={<NewsMain />} />
      <Route path="/news/:newsId" element={<News />} />
      <Route path="/about" element={<About />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/property/:propId" element={<PropPage />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
