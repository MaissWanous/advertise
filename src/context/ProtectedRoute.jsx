import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context.jsx";
import { useEffect ,useState} from "react";
import Loading from "../assets/loading/loading.jsx";

export default function ProtectedRoute() {
  const { token, setToken } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
     setChecked(true);
  }, [token]);

  if (!checked) {
    return <Loading/>;
  }
  const test = true;
  return test ? <Outlet /> : <Navigate to="/signinsignUp" />;

}
