import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { fdb } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const GooAuth = () => {
  const navigate = useNavigate();
  async function onButtonClick(e) {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const Ref = doc(fdb, "users", user.uid);
      const docSnap = await getDoc(Ref);

      if (!docSnap.exists()) {
        await setDoc(Ref, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Could't Authenticate with Google");
    }
  }
  return (
    <button
      onClick={onButtonClick}
      type="button"
      className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded"
    >
      <FcGoogle className="text-2xl  bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  );
};

export default GooAuth;
