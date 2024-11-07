import API_ROUTE from "../assets/baseRoute";
async function loginUser(payload) {
  try {
    const response = await fetch(`${API_ROUTE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if response is OK (status in the 200–299 range)
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error("Failed to login");

      if (errorData.message) error.message = errorData.message;
      
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    // If the response is OK, parse and return the JSON data
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export default loginUser;
