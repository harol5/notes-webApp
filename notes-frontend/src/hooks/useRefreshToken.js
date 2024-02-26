import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  console.log("useRefreshToken caalled!");
  const { setAuth } = useAuth();

  const refresh = async () => {
    console.log("refresh called");
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log("prev state: ", JSON.stringify(prev));
      console.log("current state: ", response.data);
      return { ...prev, code: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;