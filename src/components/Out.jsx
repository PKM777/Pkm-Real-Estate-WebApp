import { Outlet, Navigate } from "react-router-dom";
import { useLoginCheck } from "../hooks/useLoginCheck";
import Loader from "./Loader";

const Out = () => {
  const { login, status } = useLoginCheck();
  if (status) {
    return <Loader />;
  }
  return login ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default Out;
