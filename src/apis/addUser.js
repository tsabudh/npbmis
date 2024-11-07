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

    // Check if response is OK (status in the 200–299 range)
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error("Failed to login");
      error.status = response.status;
      error.data = errorData;
      throw error;
    } 

    // If the response is OK, parse and return the JSON data
    return  await response.json();

  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error;
  }
}
export default addUser;
