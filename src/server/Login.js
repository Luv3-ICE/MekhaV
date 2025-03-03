const API_BASE_URL = "https://api.pttwondrousbloom.com:4500/api/user";

export const loginUser = async (phoneNumber) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: phoneNumber }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login API Error:", error);
    return { status: false, error: "Network error" };
  }
};

export const verifyOtp = async (phoneNumber, token, otp) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verifyOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: phoneNumber, token, otp }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("OTP Verification API Error:", error);
    return { status: false, error: "Network error" };
  }
};
