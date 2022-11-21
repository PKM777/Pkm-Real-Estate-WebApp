import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/favicon.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setpage] = useState("Sign-In");
  const routePath = (path) => {
    if (path === location.pathname) {
      return true;
    }
  };
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setpage(`${auth.currentUser.displayName}`);
      } else {
        setpage("Sign-In");
      }
    });
  }, [auth]);

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center h-[50px] px-3 max-w-6xl mx-auto">
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="h-5 cursor-pointer mr-1"
            onClick={() => navigate("/")}
          />
          <h1
            onClick={() => navigate("/")}
            className="font-bold text-xl cursor-pointer"
          >
            Real-Estate
          </h1>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`bg-white cursor-pointer border-b-[3px] pb-1 ${
                routePath("/") && "font-bold border-b-yellow-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`bg-white cursor-pointer border-b-[3px] pb-1 ${
                routePath("/offers") && "font-bold border-b-yellow-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`bg-white cursor-pointer border-b-[3px] pb-1 ${
                (routePath("/sign-in") || routePath("/profile")) &&
                "font-bold border-b-yellow-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {page}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
