import axios from "axios";

const API_BASE_URL = "https://api.pttwondrousbloom.com:4500/api/user";

export const getUserProfile = async (token) => {
  try {

    const response = await axios.get(`${API_BASE_URL}/getProfile`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
