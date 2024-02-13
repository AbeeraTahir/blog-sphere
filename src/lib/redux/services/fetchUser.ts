import axios from "axios";

const fetchUser = async () => {
  try {
    const response = await axios.get("/api/user");
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUser;
