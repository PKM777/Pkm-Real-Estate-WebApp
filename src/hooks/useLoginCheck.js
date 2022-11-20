import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useLoginCheck = () => {
  const [login, setlogin] = useState(false);
  const [status, setstatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      //if user is true on authentication set login to true else false
      if (user) {
        setlogin(true);
      }
      setstatus(false);
    });
  }, []);
  return { login, status };
};
