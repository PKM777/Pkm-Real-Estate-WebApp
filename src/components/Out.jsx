import { Outlet, Navigate } from "react-router-dom";
import { useLoginCheck } from "../hooks/useLoginCheck";

const Out = () => {
  const { login, status } = useLoginCheck();
  if (status) {
    return <h3>Loading..</h3>;
  }
  return login ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default Out;
