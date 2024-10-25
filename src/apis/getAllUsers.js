import API_ROUTE from "../assets/baseRoute";

async function getAllUsers(jwtToken) {
  try {
    const response = await fetch(`${API_ROUTE}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting user:", error.message);
  }
}
export default getAllUsers;
