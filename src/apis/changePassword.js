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

    // Handle the response
    if (!response.ok) {
      console.log("response is not okay");
      const errorData = await response.json(); // Parse the error JSON response

      throw new Error(errorData?.message || `Error: ${response.status}`);
    } else {
      const result = await response.json(); // Parse the JSON response
      return result;
    }
  } catch (error) {
    console.error("Error changing password:", error.message);
    throw error;
  }
}
export default changePassword;
