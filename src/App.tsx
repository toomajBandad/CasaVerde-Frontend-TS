import FooterItem from "./components/FooterItem/FooterItem";
import Topbar from "./components/Topbar/Topbar";
import AuthProvider from "./contexts/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Topbar />
        <AppRoutes />
        <FooterItem />
      </div>
    </AuthProvider>
  );
}
