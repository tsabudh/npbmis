import API_ROUTE from "../assets/baseRoute";

async function addUser(userData, jwtToken) {
  try {
    // Send POST request with the project data
    const response = await fetch(`${API_ROUTE}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userData),
    });

    // Handle the response
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData?.message || `Error: ${response.status}`);
    } else {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error;
  }
}
export default addUser;
