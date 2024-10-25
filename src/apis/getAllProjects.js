import API_ROUTE from "../assets/baseRoute";

async function getAllProjects(jwtToken) {
  try {
    const response = await fetch(`${API_ROUTE}/projects`, {
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
    console.error("Error submitting project:", error.message);
  }
}
export default getAllProjects;
