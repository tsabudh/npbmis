import API_ROUTE from "../assets/baseRoute";

async function changePassword(payload, jwtToken) {
  try {
    const response = await fetch(`${API_ROUTE}/users/changepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(payload),
    });

    // Check if response is OK (status in the 200–299 range)
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error("Failed to login");
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    // If the response is OK, parse and return the JSON data
    return await response.json();
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}
export default changePassword;
