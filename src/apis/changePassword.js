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
      throw new Error(`Error: ${response.status}`);
    }

    const result = response.json(); // Parse the JSON response
    return result;
  } catch (error) {
    console.error("Error submitting project:", error.message);
  }
}
export default changePassword;
