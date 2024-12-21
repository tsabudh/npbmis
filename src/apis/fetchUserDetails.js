import API_ROUTE from "../assets/baseRoute";

async function fetchUserDetails(jwtToken) {
  try {
    const response = await fetch(`${API_ROUTE}/users/me`, {
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
    return result.data;
  } catch (error) {
    console.error("Error submitting user:", error.message);
  }
}
export default fetchUserDetails;
