import FooterItem from "./components/FooterItem/FooterItem";
import Topbar from "./components/Topbar/Topbar";
import AuthProvider from "./contexts/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Topbar />
        <AppRoutes />
        <FooterItem />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AuthProvider>
  );
}
