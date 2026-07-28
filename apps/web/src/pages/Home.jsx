// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Feed from "../components/Feed";
const Home = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//};

  return (
    <MainLayout>
        <Feed />
    </MainLayout>
  );
};


export default Home;
