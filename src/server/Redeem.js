export const claimReward = async (staffCode, userToken) => {
  console.log(staffCode, userToken);

  try {
    const response = await fetch(
      "https://api.pttwondrousbloom.com:4500/api/user/claimReward",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken, // ใส่ Token ใน Header
        },
        body: JSON.stringify({ staff_code: staffCode }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to claim reward");
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
