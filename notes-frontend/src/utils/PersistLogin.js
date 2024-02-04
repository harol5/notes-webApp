import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

function PersistLogin() {
  console.log("PersistLogin called");
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    console.log("PersistLogin: first useEffect called");
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        console.log("refresh() returned");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        console.log("finally block ran!!");
      }
    };

    console.log("PersistLogin: first useEffect done");
    !auth?.code ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("PersistLogin: second useEffect called");
    console.log(`-----isLoadin: ${isLoading}`);
    console.log(`-----at: ${JSON.stringify(auth?.code)}`);
    console.log("PersistLogin: second useEffect done");
  }, [isLoading]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
}

export default PersistLogin;
