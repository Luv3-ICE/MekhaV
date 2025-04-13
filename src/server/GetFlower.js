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
    localStorage.clear();
    return null;
  }
};

export const fetchUserProfile = async (
  userData,
  setUserFlower,
  setUserData
) => {
  try {
    if (userData && userData.access_token) {
      const profileData = await getUserProfile(userData.access_token);
      if (profileData) {
        setUserFlower(profileData.data.account_flowers);
        localStorage.setItem(
          "userFlower",
          JSON.stringify(profileData.data.account_flowers)
        );

        setUserData(profileData.data.account);
        localStorage.setItem(
          "userData",
          JSON.stringify(profileData.data.account)
        );
      }
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};
