import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  console.log("useAxiosPrivate started");
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    console.log("useAxiosPrivate called -- useEffect started");
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          console.log(
            "useAxiosPrivate called -- useEffect -- request intersept"
          );
          console.log(config);
          config.headers["Authorization"] = `Bearer ${auth?.code}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(
          "useAxiosPrivate called -- useEffect -- response intersept"
        );
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    console.log("useAxiosPrivate called -- useEffect done");

    return () => {
      console.log("useAxiosPrivate called -- useEffect -- clean up func");
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  console.log("useAxiosPrivate done");
  return axiosPrivate;
};

export default useAxiosPrivate;
